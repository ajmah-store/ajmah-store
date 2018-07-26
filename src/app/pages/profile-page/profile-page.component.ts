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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    //initialize Semantic UI Components
    setTimeout(()=>this.initUI(), 300);
  }

  initUI() {
    $("#sidebar").visibility({
      type: 'fixed',
      offset: $('#navbar').outerHeight()
    });

  }

}
