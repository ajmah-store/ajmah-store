import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Dictionary, ArrayList } from '@arjunatlast/jsds';
import { CartSlot } from '../../models/cart-slot.model';
import { Product } from '../../models/product.model';
import { Store } from '@ngxs/store';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { CloseCart } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cart: ArrayList<CartSlot>;
  subscription = new Subscription();

  

  @ViewChild('cartModal') cartModal: ElementRef;

  constructor(
    private cs: CartService,
    private store: Store
  ) { }

  ngOnInit() {

    //get cart
    this.getCart();

    //init modal
    $(this.cartModal.nativeElement).modal({
      onApprove: () => {},
      onDeny: () => {},
      onHidden: () => {
        this.store.dispatch(new CloseCart())
      }
    }).modal('setting', 'closable', false);
    
  }

  @Input()
  set show(val: boolean) {

    if(val) $(this.cartModal.nativeElement).modal('show');
    else $(this.cartModal.nativeElement).modal('hide');

  }

  getCart() {
    //get cart
    this.cs.getCart().subscribe(
      cart => {
        this.cart = cart;
      }
    );
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

  ngOnDestroy() {
    
    $(this.cartModal).modal('hide');

  }

  updateQuantity(product: Product, quantity: string) {

    const q = parseInt(quantity);
    
    if(!isNaN(q)) this.cs.updateQuantity(product.id, Math.abs(q));

  }

}
