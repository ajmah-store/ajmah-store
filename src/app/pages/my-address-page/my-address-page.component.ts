import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from '../../models/address.model';
import { ArrayList } from '@arjunatlast/jsds';
import { trigger, transition, query, animate, style, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AddressService } from '../../services/address.service';
import { Store } from '@ngxs/store';
import { CreateConfirm } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-my-address-page',
  templateUrl: './my-address-page.component.html',
  styleUrls: ['./my-address-page.component.scss'],
  animations: [
    trigger('addressAnimation', [

      transition(":leave", [
        animate("300ms ease-in", style({opacity:0, height: '0px', overflow: 'hidden'}))
      ]),

      transition(":enter", [
        style({opacity:0, height: '0px', overflow: 'hidden'}),
        animate("300ms ease-in", style({opacity:0, height: '400px', overflow: 'hidden'}))
      ])
    ])
  ]
})
export class MyAddressPageComponent implements OnInit, OnDestroy {

  addresses: ArrayList<Address>;

  //states
  private _addAddressOpen:boolean = false;
  private _editAddress: Address = null;

  //subscriptions
  subscriptions = new Subscription();

  constructor(
    private ab: AddressService,
    private store: Store
  ) { }

  ngOnInit() {


    //get addresses
    this.subscriptions.add(
      this.ab.getAllAddress().subscribe(

        (addressList) => {

          this.addresses = addressList;

        }

      )
    );

  }

  /* */
  get addAddressOpen(): boolean {
    return this._addAddressOpen;
  }

  set addAddressOpen(val: boolean) {
    this._addAddressOpen = val;

    if(val) {
      this.scrollToElement('#addAddressSegment')
    }
  }

  /* */

  set editAddress(address: Address) {
    this._editAddress = address;

    if(address) {
      this.scrollToElement('#editAddressSegment')
    }
  }

  get editAddress() {
    return this._editAddress;
  }

  removeAddress(address: Address) {

    console.log(address);
    
    //create a confirm box
    this.store.dispatch(

      new CreateConfirm({
        title: `Remove Address`,
        content: `Are you sure you wan't to remove address of ${address.name}`,
        okButton: {
          text: 'Yes, Remove',
          icon: 'trash alternate',
          onClick: () => {

            //remove address
            this.ab.removeAddress(address);
            
            return true;
          }
        },
        cancelButton: {
          text: 'No, Go back',
          icon: 'arrow left',
          onClick: () => {
            return true;
          }
        }
      })

    );

  }


  ngOnDestroy() {

    //unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();

  }

  // Private //
  /**
   * Scroll to a particular element on page
   * @param target query selector of target element
   */
  private scrollToElement(target) {

    setTimeout(
      () => {
        $('html, body').animate({
          scrollTop: $(target).offset().top - $("#navbar").height() - 28
        }, 500);
      },
      100
    );

  }

}
