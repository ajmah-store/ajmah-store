import { Component, OnInit } from '@angular/core';
import { primary_menu } from '../../constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuLinks = primary_menu;

  constructor() { }

  ngOnInit() {

    this.initUI();

  }

  initUI() {
    $('#navbar-search')
    .search({
      // source : content,
      // searchFields   : [
      //   'title'
      // ],
      // fullTextSearch: false
      apiSettings: {
        url: '/search/{query}'
      }
    });

    $('#navbar-dropdown').dropdown();

    //sticky navbar
    $('#navbar').visibility({
      type: 'fixed'
    });
  }

}
