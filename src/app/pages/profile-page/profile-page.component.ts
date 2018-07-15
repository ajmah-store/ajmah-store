import { Component, OnInit } from '@angular/core';
import { profile_menu, REGEXP } from '../../constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  sidebar_links = profile_menu;

  //form groups
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    //initialize Semantic UI Components
    this.initUI();

    //create profile form group
    this.createProfileForm();
  }

  initUI() {
    $("#sidebar").visibility({
      type: 'fixed',
      offset: $('#navbar').height()+28
    });

  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      'first_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'last_name': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.name)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.email)])],
      'phone': ['', Validators.compose([Validators.required, Validators.pattern(REGEXP.phone)])],
      'gender': 'male',
      'dob': ''
    });
  }

}
