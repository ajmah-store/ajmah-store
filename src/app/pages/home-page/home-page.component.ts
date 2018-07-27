import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ArrayList } from '@arjunatlast/jsds';
import { Product } from '../../models/product.model';
import { Store } from '@ngxs/store';
import { Alert, ALERT_TYPES } from '../../models/alert.model';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products: ArrayList<Product>;

  constructor(
    private ps: ProductService,
    private store: Store,
    private cart: CartService
  ) { }

  ngOnInit() {

    this.fetchProducts(6);

  }

  async fetchProducts(limit: number) {

    this.products = await this.ps.getProducts(limit);

    // this.products = new ArrayList<Product>(limit, ...[
    //   {
    //     "salesCount":0,
    //     "description":"Delicious Crispy and Tasty French Fries",
    //     "discount":10,
    //     "featured":true,
    //     "unit":"piece",
    //     "name":"McCain French Fries",
    //     "category":{
    //       "imageUrl":"https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fcategories%2F3rLLQ7jeRZpqwtBg5nto?alt=media&token=29869d75-1d3b-49d4-9523-7fa4b34ec5b2",
    //       "id":"3rLLQ7jeRZpqwtBg5nto",
    //       "productCount":1,
    //       "name":"Bakery",
    //       "salesCount":0
    //     },
    //     "id":"wqEbunhdsGHmG5k9wNW4",
    //     "price":30,
    //     "featuredImageUrl":"https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fproducts%2FwqEbunhdsGHmG5k9wNW4?alt=media&token=9bffc043-9c6b-40b9-a241-ee0d0b256a1b"
    //   }
    // ]);
    
  }

  addToCart(product: Product) {

    this.cart.addToCart(product);

  }

  likeProduct(product: Product) {

    console.log('like product ' + product.name);
    
  }

}
