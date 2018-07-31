import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { ArrayList } from '@arjunatlast/jsds';
import { Address } from '../../models/address.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { THEME, DIRECTORIES } from '../../constants';
import { CartSlot } from '../../models/cart-slot.model';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product.model';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {

  addresses: ArrayList<Address>;
  activeAddress: Address;

  userCart: ArrayList<CartSlot>;

  currentStep = 1;

  currentUser: User;

  subscriptions = new Subscription();

  paymentLoading = false;

  placeOrderLoading = false;

  last_order: any;

  constructor(
    private ab: AddressService,
    private cs: CartService,
    private payment: PaymentService,
    private router: Router
  ) { }

  ngOnInit() {

    
    this.subscriptions.add(

      //get all addresses of current user
      this.ab.getAllAddress().subscribe(

        addresses => {
  
          this.addresses = addresses;
  
        }
      )

    ).add(

      //get user cart
      this.cs.getCart().subscribe(

        cart => {

          this.userCart = cart;

        }
      )
    );

  }

  /**
   * Set the current step
   */
  setStep(step: number) {
    this.currentStep = step;
  }

  /**
   * Set step as active, complete or disabled
   * @param step the step to style
   */
  getStepStyle(step: number) {

    return {
      active: step === this.currentStep,
      disabled: step > this.currentStep || this.currentStep === 4,
      completed: step < this.currentStep
    }

  }

  selectAddress(address: Address) {

    this.activeAddress = address;

  }

  /**
   * Confirm order
   */
  async confirmOrder(amount: number) {

    //start loading
    this.placeOrderLoading = true;

    this.last_order = await this.payment.confirmOrder(amount, this.activeAddress, this.userCart, this.genProductDescription());

    if(this.last_order) {

      //clear the cart
      this.cs.emptyCart();
      
      //move to next step
      this.setStep(3);

    }
    
    //stop loading
    this.placeOrderLoading = false;

  }

  /**
   * Open razorpay checkout dialog
   */
  async completePayment() {

    this.paymentLoading = true;

    //complete payment returns true on success
    const success = await this.payment.pay(this.last_order.amount, this.genProductDescription(), this.last_order.id);

    if(success) {

      this.setStep(4);

    }

    this.paymentLoading = false;

  }

  /**
   * Create a product description for razorpay checkout box
   */
  genProductDescription() {

    if (this.userCart.size() === 1) {

      const { product, quantity } = this.userCart.get(0);

      return `${product.name} x ${quantity}` ;

    }

    else if (this.userCart.size() === 2) {

      const [s1, s2] = [this.userCart.get(0), this.userCart.get(1)];

      return `${s1.product.name} and ${s2.product.name}`;

    }

    else if (this.userCart.size() > 2) {

      const [s1, s2] = [this.userCart.get(0), this.userCart.get(1)];

      return `${s1.product.name}, ${s2.product.name} and ${this.userCart.size() - 2} more`;

    }
    else {

      return '';

    }
  }

  ngOnDestroy() {

    this.subscriptions.unsubscribe();

  }

}
