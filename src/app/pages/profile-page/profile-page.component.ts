import { Component, OnInit } from '@angular/core';
import { profile_menu } from '../../constants';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  sidebar_links = profile_menu;

  constructor() { }

  ngOnInit() {

    //initialize Semantic UI Components
    this.initUI();
  }

  initUI() {
    $("#sidebar").visibility({
      type: 'fixed',
      offset: $('#navbar').height()+28
    });

  }

}
