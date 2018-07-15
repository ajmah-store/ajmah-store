import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //initialize common semantic ui components
    this.initUI();
  }

  initUI() {

    //checkbox
    $('.ui.checkbox').checkbox();
    //$('.ui.radio.checkbox').checkbox();

    //select dropdown
    $('select.dropdown').dropdown();

  }

}
