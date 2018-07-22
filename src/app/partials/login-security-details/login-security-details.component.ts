import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, state, style, query, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { DismissAlert, CreateAlert } from '../../store/actions/ui.actions';
import { ALERT_TYPES, Alert } from '../../models/alert.model';
import { Store } from '@ngxs/store';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-security-details',
  templateUrl: './login-security-details.component.html',
  styleUrls: ['./login-security-details.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition("*=>*", [
        //leave anim
        query('.item:leave', animate('300ms ease-in-out', style({opacity:0, transform: 'translateY(-50px)'})),{optional: true}),
        //enter anim
        query('.item:enter', style({opacity:0, transform: 'translateY(-50px)'}), {optional: true}),
        query('.item:enter', animate('300ms ease-in-out', style({opacity:1, transform: 'translateY(0)'})), {optional: true}),
      ])
    ])
  ]
})
export class LoginSecurityDetailsComponent implements OnInit {

  //input user
  @Input() user: User;

  enableEditEmail = false;
  enableEditPassword = false;

  //formGroups
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;

  //loading
  emailFormIsLoading:boolean = false;
  passwordFormIsLoading:boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store
  ) { }

  ngOnInit() {

    //init formgroups
    this.createEmailForm();
    this.createPasswordForm();
  }

  createEmailForm() {
    this.changeEmailForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  createPasswordForm() {
    this.changePasswordForm = this.fb.group({
      'cur_password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      're_password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  /**
   * Check if a form is invalid and dirty
   */
  isInvalid(formGroup: FormGroup, formControlName: string) {

    const control = formGroup.controls[formControlName];

    return control.invalid && control.dirty

  }

  /**
   * Check if new password and repassword matches
   */
  get match_password(): boolean {

    const data =  this.changePasswordForm.value;

    return data.password === data.re_password;
  }

  /**
   * Update email address
   */
  async updateEmail() {

    //start loading
    this.emailFormIsLoading = true;

    try {

      //check if form is valid or not
      if(this.changeEmailForm.invalid) throw new Error("Invalid Credentials.");

      //get form data
      const data = this.changeEmailForm.value;

      //update email of the user
      await this.auth.updateEmail(data.email, data.password);

      //reset form
      this.changeEmailForm.reset();

    }//try

    catch(error) {

      //alert error
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Error!',
        content: error || error.message,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => {this.store.dispatch(new DismissAlert(alert));}, 3000);

    }//catch

    finally {

      //stop loading
      this.emailFormIsLoading = false;
    }//finally

  }

  /**
   * Update user password
   */
  async updatePassword() {

    //start loading
    this.passwordFormIsLoading = true;

    try {

      //check if form is valid
      if(this.changePasswordForm.invalid) throw new Error("Invalid credentials");

      //get form data
      const data = this.changePasswordForm.value;

      //check if passwords match
      if(data.password !== data.re_password) throw new Error("Passwords do not match");

      //update password
      await this.auth.updatePassword(data.cur_password, data.password);

      //reset form
      this.changePasswordForm.reset();

    }//try

    catch(error) {

      //alert error
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Error!',
        content: error || error.message,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => {this.store.dispatch(new DismissAlert(alert));}, 3000);

    }//catch

    finally {

      //stop loading
      this.passwordFormIsLoading = false;

    }//finally

  }

}
