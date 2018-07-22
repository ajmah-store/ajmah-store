import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { REGEXP, user_menu } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { User, USER_TYPES } from '../../models/user.model';
import { Store } from '@ngxs/store';
import { Alert } from '../../models/alert.model';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';
import { ALERT_TYPES } from '../../models/alert.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  //states
  loginFormIsLoading:boolean = false;
  registerFormIsLoading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private store: Store
  ) { }

  ngOnInit() {

    //init forms
    this.createLoginForm();
    this.createRegisterForm();

  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }//createLoginForm

  createRegisterForm() {
    this.registerForm = this.fb.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }//createRegisterForm

  isInvalid(control: FormControl) {
    return control.invalid && control.dirty;
  }//isInvalid


  /**
   * Login the user using email and password
   */
  async login() {

    //if form is valid
    if(this.loginForm.valid) {

      //start loading
      this.loginFormIsLoading = true;

      //get credentials from form
      const credentials = this.loginForm.value;

      //try loging in using credentials
      try {

        //await till logged in
        await this.auth.login(credentials.email, credentials.password);

      }//try

      finally {

        //stop loading
        this.loginFormIsLoading = false;

      }//finally
      
    }

    else {

      //send alert
      const alert: Alert = {
        title: "Error",
        content: 'Invalid credentials',
        icon: 'exclamation circle',
        type: ALERT_TYPES.ERROR
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }//else

  }//login


  /**
   * Create a new user account
   */
  async createAccount() {

    if(this.registerForm.valid) {

      //start loading
      this.registerFormIsLoading = true;

      //get data from form
      const data = this.registerForm.value;

      const user = {
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        type: USER_TYPES.NORMAL
      };

      //try creating account
      try {

        //create new account
        await this.auth.createAccount(user, data.password);

      }//try

      //request completed
      finally {

        //stop loading
        this.registerFormIsLoading = false;

      }//finally

    }//if valid

    else {

      //send alert
      const alert: Alert = {
        title: "Error",
        content: 'Invalid credentials',
        icon: 'exclamation circle',
        type: ALERT_TYPES.ERROR
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 seconds
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }//else valid
    

  }//createAccount

}
