import { Injectable } from '@angular/core';
import { AngularFireFunctions } from 'angularfire2/functions';
import { FUNCTIONS, COLLECTIONS } from '../constants';
import { Product } from '../models/product.model';
import { ArrayList } from '@arjunatlast/jsds';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { CreateAlert, DismissAlert } from '../store/actions/ui.actions';
import { Alert, ALERT_TYPES } from '../models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];

  constructor(
    private api: AngularFireFunctions,
    private db: AngularFirestore,
    private store: Store
  ) { }

  /**
   * Get the latest products from store
   * @param limit maximum number of products to retrieve
   */
  async getProducts(limit: number): Promise<ArrayList<Product>> {

    try {

      //call the getLatestProducts function
      const products = await this.api.httpsCallable(FUNCTIONS.CALLABLE.getLatestProducts)(limit).toPromise();

      //backup products
      this.products = products;

      //return product as arraylist
      return new ArrayList(limit, ...products);

    }

    catch(error) {

      //return previously loaded product
      if(this.products) return new ArrayList(limit, ...this.products);

      console.log(error);

      //create alert
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: `Couldn't load products`,
        content: error.message || error,
        icon: 'exclamation circle'
      };

      //alert error
      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }
    
  }

}
