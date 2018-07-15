import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb:FormBuilder) { }

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
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

}
