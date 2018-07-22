import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';
import { Observable } from 'rxjs';
import { AddressService } from '../../services/address.service';
import { ArrayList } from '@arjunatlast/jsds';
import { trimData } from '../../helpers';
import { Store } from '@ngxs/store';
import { ALERT_TYPES } from '../../models/alert.model';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

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

  }

  private initUI() {

    //init dropdown
    $('select.dropdown').dropdown();

    //create address form
    this.createAddressForm();

  }

  private createAddressForm() {

    this.addressForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      building: ['', Validators.required],
      locality: ['', Validators.required],
      landmark: '',
      city: ['', Validators.required],
      type: ['home', Validators.compose([Validators.required, Validators.pattern('(home)|(office)')])],
      pin: ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.pin)])],
      state: ['', Validators.required]
    });

  }

    /**
   * Check if a form control is invalid and dirty
   */
  isInvalid(formControlName: string) {

    const control = this.addressForm.controls[formControlName];

    return control.invalid && control.dirty

  }

  /**
   * Add new address
   */
  async addAddress() {

    //start loading
    this.addressFormIsLoading = true;

    try {

      //check if form is valid
      if(this.addressForm.invalid) throw new Error("Invalid credentials");

      //get data from form
      const data = trimData(this.addressForm.value);

      //add address
      await this.ab.addAddress(data);

      //reset form
      this.addressForm.reset();

    }

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

    }

    finally {

      //stop loading
      this.addressFormIsLoading = false;

    }

  }

}
