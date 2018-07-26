import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { Product } from '../models/product.model';
import { Alert, ALERT_TYPES } from '../models/alert.model';
import { CreateAlert, DismissAlert } from '../store/actions/ui.actions';
import { first, map } from 'rxjs/operators';
import { Dictionary, ArrayList } from '@arjunatlast/jsds';
import { CartSlot } from '../models/cart-slot.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Dictionary<CartSlot> = new Dictionary<CartSlot>();
  private cart$ = new Subject<ArrayList<CartSlot>>();

  constructor(
    private auth: AuthService,
    private store: Store
  ) {

    setTimeout(()=>this.emitValue(), 1000);

   }

  /**
   * Add a product to cart
   * @param product the product to be added to cart
   * @param quantity the quantity of product to be added
   */
  async addToCart(product: Product, quantity: number = 1) {

    try {

      const user = await this.auth.authState$.pipe(first(user => user !== undefined)).toPromise();

      if(!user) throw new Error('You have to be logged in to use cart.');

      //add item to the cart only if it is absent
      if(this.cart.putIfAbsent(product.id, {product: product, quantity: quantity})) this.cart.get(product.id).quantity += quantity;

      //emit new cart
      this.emitValue();

      //alert
      const alert: Alert = {
        type: ALERT_TYPES.INFO,
        title: `New Item in Cart`,
        content: `${product.name} has been added to your cart. Open your cart and click checkout to complete shopping.`,
        icon: 'cart add'
      }

      this.store.dispatch(new CreateAlert(alert));

      //dismiss after 3 seconds
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: `Couldn't add item to cart`,
        content: error.message || error,
        icon: 'exclamation circle'
      }

      this.store.dispatch(new CreateAlert(alert));

      //dismiss after 3 seconds
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);

    }

  }

  /**
   * Remove a product from cart
   * @param product_id id of the product to be removed
   */
  removeFromCart(product_id: string) {

    //remove item from the cart and emit value (if product exist)
    if(this.cart.remove(product_id)) this.emitValue();

  }

  /**
   * Update the quantity of a product in the cart
   * @param product_id id of the product to update count
   * @param quantity the new quantity of the product
   */
  updateQuantity(product_id: string, quantity: number) {

    try {
      
      //find the corresponding slot
      const slot = this.cart.get(product_id);

      //if slot doesn't exist throw error
      if(!slot) throw new Error('Seems like the product is not on your cart.');

      //change quantity
      slot.quantity = Math.abs(quantity);

      //emit new cart
      this.emitValue();

    }

    catch(error) {
      
      //alert
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: `Couldn't update product`,
        content: error.message || error,
        icon: 'exclamation circle'
      }

      this.store.dispatch(new CreateAlert(alert));

      //dismiss after 3 seconds
      setTimeout(()=>this.store.dispatch(new DismissAlert(alert)), 3000);

    }

  }

  /**
   * Return a list of products in the cart
   */
  getCart(): Observable<ArrayList<CartSlot>> {

    return this.cart$.asObservable();
    
  }

  private emitValue() {

    this.cart$.next(new ArrayList<CartSlot>(this.cart.size(), ... this.cart.values().toArray()));

  }

}
