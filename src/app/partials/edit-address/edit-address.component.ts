import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';
import { AddressService } from '../../services/address.service';
import { trimData } from '../../helpers';
import { Store } from '@ngxs/store';
import { ALERT_TYPES } from '../../models/alert.model';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit, OnChanges {

  @Input() address: Address;

  //formGroups
  addressForm: FormGroup;

  //loading status
  addressFormIsLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ab: AddressService,
    private store: Store
  ) { }

  ngOnInit() {

    //initialize semantic UI
    this.initUI();

    //create address form
    this.createAddressForm();

  }

  ngOnChanges() {

    //rebuild form
    this.createAddressForm();

  }

  private initUI() {

    //init dropdown
    $('select.dropdown').dropdown();

  }

  private createAddressForm() {

    this.addressForm = this.fb.group({
      name: [this.address.name, Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      phone: [this.address.phone, Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      building: [this.address.building, Validators.compose([Validators.required, Validators.pattern(REGEXP.non_empty)])],
      locality: [this.address.locality, Validators.compose([Validators.required, Validators.pattern(REGEXP.non_empty)])],
      landmark: [this.address.landmark || '', Validators.pattern(REGEXP.non_empty)],
      city: [this.address.city, Validators.compose([Validators.required, Validators.pattern(REGEXP.non_empty)])],
      type: [this.address.type, Validators.compose([Validators.required, Validators.pattern('(home)|(office)')])],
      pin: [this.address.pin, Validators.compose([Validators.required, Validators.pattern(REGEXP.pin)])],
      state: [this.address.state, Validators.compose([Validators.required, Validators.pattern(REGEXP.non_empty)])]
    });

  }

  /**
   * Check if a form control is invalid and dirty
   */
  isInvalid(formControlName: string) {

    const control = this.addressForm.controls[formControlName];

    return control.invalid && control.dirty

  }

  updateAddress() {

    //start loading
    this.addressFormIsLoading = true;

    try {

      //check if form is valid
      if(this.addressForm.invalid) throw new Error("Invalid credentials");

      //get data from form
      const data = trimData(this.addressForm.value);

      //update address
      this.ab.updateAddress(this.address.id, data);

      //reset form
      this.addressForm.reset();

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

    finally {

      //stop loading
      this.addressFormIsLoading = false;

    }

  }


}
