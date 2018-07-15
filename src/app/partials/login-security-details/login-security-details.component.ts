import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, query, animate } from '@angular/animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REGEXP } from '../../constants';

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

  enableEditEmail = false;
  enableEditPassword = false;

  //formGroups
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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

}
