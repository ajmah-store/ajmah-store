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

    this.initUi();

  }

  initUi() {
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
  }

}
