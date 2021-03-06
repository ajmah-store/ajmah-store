import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Address, ADDRESS_TYPES } from '../models/address.model';
import { first, map, mergeMap } from 'rxjs/operators';
import { COLLECTIONS } from '../constants';
import { ALERT_TYPES } from '../models/alert.model';
import { CreateAlert, DismissAlert } from '../store/actions/ui.actions';
import { Store } from '@ngxs/store';
import { capitalize } from '../helpers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';
import { ArrayList } from '@arjunatlast/jsds';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private citiesUrl = 'assets/cities.json';

  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private store: Store,
    private http: HttpClient
  ) { }


  /**
   * Add a new address to the current user
   * @param address The new address to be added
   */
  async addAddress(address: Address) {

    try {

      if(!address) throw new Error("Invalid request");

      //get current user
      const user = await this.auth.authState$.pipe(first(user => user!==undefined)).toPromise();

      //if no user throw error
      if(!user) throw new Error("You're not authorized to view this content.");

      //generate a new firestore id
      address.id = this.db.createId();

      //add new address to firestore for current user
      await this.db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ADDRESSES).doc(address.id).set(address);

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: `New ${capitalize(address.type)} Address` ,
        content: `New Address of ${address.name} has been added to your address book.`,
        icon: 'address card'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);
      
    }//try

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Couldn\'t add address!',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }//catch

  }//add address

  /**
   * Return all address of the user
   */
  getAllAddress(): Observable<ArrayList<Address>> {

    return this.auth.authState$.pipe(mergeMap(

      user => {

        //if no user throw error
        if(!user) throw new Error("You're not authorized to view this content.");

        return this.db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ADDRESSES).valueChanges().pipe(map(

          (addresses: Address[]) => {

            return new ArrayList<Address>(Infinity, ...addresses);

          }

        ));
      }
    ));
  }//getAllAddress

  /**
   * Update a users address
   * @param aid address id
   * @param data partial details of address to be updated
   */
  async updateAddress(aid: any, data: Partial<Address>) {

    try {

      //invalid request
      if(!aid || !data) throw new Error('Invalid request');

      //get current user
      const user = await this.auth.authState$.pipe(first(user => user!==undefined)).toPromise();

      //if no user throw error
      if(!user) throw new Error("You're not authorized to view this content.");

      //update address
      await this.db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ADDRESSES).doc(aid).update(data);

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: `Address Updated` ,
        content: `Your address has been updated successfully.(Note: Any orders placed to this address before updating will be delivered to the old address)`,
        icon: 'address card'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert error
      const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Couldn\'t update address!',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

  }//update address

  /**
   * Remove an address from the current users address book
   * @param address Address to be removed
   */
  async removeAddress(address: Address) {

    try {

      if(!address) throw new Error("Invalid request");

      //get current user
      const user = await this.auth.authState$.pipe(first(user => user!==undefined)).toPromise();

      //if no user throw error
      if(!user) throw new Error("You're not authorized to view this content.");

      //remove address
      await this.db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ADDRESSES).doc(address.id).delete()

      //alert success
      const alert = {
        type: ALERT_TYPES.SUCCESS,
        title: `Address Removed` ,
        content: `The address of ${address.name} has been removed from your address book`,
        icon: 'trash alternate'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

       //alert error
       const alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Couldn\'t remove address!',
        content: error.message || error,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

  }//remove address


  // /**
  //  * Retrieve cities of india
  //  * @param state Filter results based on state of the city
  //  */
  // getCities(state?: string): Observable<ArrayList<City>> {

  //   return this.http.get(this.citiesUrl).pipe(map(

  //     (cities: City[]) => {
  //       return new ArrayList<City>(Infinity, ...cities);
  //     }
      
  //   ));

  // }



}
