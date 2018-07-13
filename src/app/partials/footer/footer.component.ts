import { Component, OnInit } from '@angular/core';
import { footer_menu } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  this_year = new Date().getFullYear();

  menu_links = footer_menu;

  constructor() { }

  ngOnInit() {
  }

}
