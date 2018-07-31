import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartSlot } from '../../models/cart-slot.model';
import { Product } from '../../models/product.model';
import { ArrayList } from '@arjunatlast/jsds';

@Component({
  selector: 'app-billing-checkout',
  templateUrl: './billing-checkout.component.html',
  styleUrls: ['./billing-checkout.component.scss']
})
export class BillingCheckoutComponent implements OnInit {

  @Input() cart: ArrayList<CartSlot>;
  @Input() payment: boolean = false;

  //show loading for button
  @Input() paymentLoading: boolean = false;
  @Input() orderLoading: boolean = false;

  @Output() confirm = new EventEmitter<number>();
  @Output() pay = new EventEmitter();

  constructor( ) { }

  ngOnInit() {

  }

  discountPrice(product: Product) {

    return Math.floor(product.price * (100 - product.discount)/100);

  }

  totalPrice(item: CartSlot) {

    return this.discountPrice(item.product)*item.quantity;

  }

  grandTotal() {

    let total = 0;

    this.cart.forEach(

      item => {

        total += this.totalPrice(item);

      }

    );

    return total;

  }

  emitConfirm() {

    this.confirm.emit(this.grandTotal());

  }

  emitPay() {

    this.pay.emit();

  }


}
