import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from '../../models/address.model';
import { ArrayList } from '@arjunatlast/jsds';
import { trigger, transition, query, animate, style, state } from '@angular/animations';
import { Subscription } from 'rxjs';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-my-address-page',
  templateUrl: './my-address-page.component.html',
  styleUrls: ['./my-address-page.component.scss'],
  animations: [
    trigger('addressAnimation', [

      transition(":leave", [
        animate("300ms ease-in-out", style({opacity:0, height: '0px'}))
      ]),

      transition(":enter", [
        style({opacity:0, height: '0px'}),
        animate("300ms ease-in-out", style({opacity:0, height: '400px'}))
      ])
    ])
  ]
})
export class MyAddressPageComponent implements OnInit, OnDestroy {

  addresses: ArrayList<Address>;

  //states
  addAddressOpen:boolean = false;

  //subscriptions
  subscriptions = new Subscription();

  constructor(
    private ab: AddressService
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


  ngOnDestroy() {

    //unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

}
