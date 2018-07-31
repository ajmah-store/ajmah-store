import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DIRECTORIES, THEME, FUNCTIONS, COLLECTIONS } from '../constants';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';
import { Address } from '../models/address.model';
import { CartService } from './cart.service';
import { ArrayList } from '@arjunatlast/jsds';
import { CartSlot } from '../models/cart-slot.model';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { Order } from '../models/order.model';
import { Store } from '@ngxs/store';
import { CreateAlert, DismissAlert } from '../store/actions/ui.actions';
import { Alert, ALERT_TYPES } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private auth: AuthService,
    private cart: CartService,
    private http: HttpClient,
    private db: AngularFirestore,
    private store: Store
  ) { }

/**
 * Open Razorpay checkout dialogue and complete payment
 * @param amount Amount to be paid in rupees
 * @param description Description about the payment
 * @param orderId id of the order placed
 */
  async pay(amount: number, description: string, orderId?: string) {

    try {

      //get current user
      const user: User = await this.auth.currentUser$.pipe(first(user => user !== undefined)).toPromise();

      //placeholder to store invoice id
      let invoice_id: string;

      //get order from database
      if(orderId) {

        //order id
        const order = (await this.db.collection(COLLECTIONS.ORDERS).doc(orderId).ref.get()).data() as Order;

        invoice_id = order.invoice_id;

      }

      // Options for razorpay checkout api
      var options = {
        "key": environment.razorpay_key,
        "amount": amount*100,
        "name": "Ajmah Store",
        "description": description,
        "image": `${DIRECTORIES.assets}/logo.svg`,
        "handler": function (response){
          
          //capture the payment from server
          this.capturePayment(response, amount, user.id);

        },
        "prefill": {
            "name": `${user.first_name} ${user.last_name}`,
            "email": user.email,
            "contact": user.phone
        },
        "theme": {
            "color": THEME.primary
        },
        "order_id": orderId,
        "invoice_id": invoice_id
      };

      var rzp = new Razorpay(options);

      //open razorpay checkout modal
      rzp.open();

      return true;

    }

    catch(error) {

      //alert error
      const alert:Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Failed to complete payment',
        content: error.message || error,
        icon: 'exclamation circle'
      };
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)));

      //negetive response
      return false;

    }

  }

  /**
   * Confirm order for items in cart
   * @param amount Amount of the order in rupees
   * @param address Billing Address of the order
   * @param cartList ArrayList of items in the order
   * @param cartList optional description
   */
  async confirmOrder(amount: number, address: Address, cartList: ArrayList<CartSlot>, description?: string) {

    try {

      if(!amount || !address || !cartList || cartList.isEmpty()) throw new Error('Invalid Request');

      //extract items from the order
      const items = cartList.toArray();

      //get current user
      const user = await this.auth.authState$.pipe(first(user => user !== undefined)).toPromise();

      //call the createOrder api {amount, currency, address, items, uid}
      const order:any = await this.http.post(
        `${FUNCTIONS.HOST_URL}/${FUNCTIONS.API.createOrder}`,
        {
          amount: amount*100,
          currency: 'INR',
          address: address,
          items: items,
          uid: user.uid
        }
      ).toPromise();

      //alert success
      const alert:Alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Order Placed',
        content: (description? `Your order placed for ${description}.`: `Your order has been placed.`)+'Complete payment to checkout.',
        icon: 'handshake'
      };
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);


      return order;

    }

    catch(error) {

      //alert error
      const alert:Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Failed to place order',
        content: `We faced some difficulty while placing the order. Please try again.`,
        icon: 'exclamation circle'
      };
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);

      //negetive response
      return null;

    }

  }//confirm order

  
  /**
   * Notify server about the payment
   * @param response The response recieved after a successfull payment
   * @param amount The amount paid 
   * @param uid User ID of the current user
   */
  private async capturePayment(response: any, amount: number, uid: any) {

    try {

      //get payment id from response
      const pid = response.payment_id || response;

      //notify server that the payment is complete
      await 
      this.http.post(
        `${FUNCTIONS.HOST_URL}/${FUNCTIONS.API.completePayment}`,
        {
          uid: uid,
          payment_id: pid,
          amount: amount*100
        }
      ).toPromise();

      //alert success
      const alert:Alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Payment Successful',
        content: `Your payment of ₹${amount} was successfull.`,
        icon: 'handshake'
      };
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert error
      const alert:Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Failed to complete payment',
        content: `We failed to complete your payment. If cash was debited from your account, send a request for refund along with the order ID to support@ajmah.com`,
        icon: 'exclamation circle'
      };
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)));

      //negetive response
      return null;

    }

  }

}
