import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UIState } from '../../store/states/ui.state';
import { Alert } from '../../models/alert.model';
import { Observable } from 'rxjs';
import { trigger, transition, query, animate, style } from '@angular/animations';
import { DismissAlert } from '../../store/actions/ui.actions';
import { Confirm } from '../../models/confirm.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [
    trigger('alertAnimation', [
      transition('*=>*', [
        //leave anim
        query('.message:leave', animate('300ms ease-in-out', style({opacity:0, transform: 'translateY(-50px)'})),{optional: true}),
        //enter anim
        query('.message:enter', style({opacity:0, transform: 'translateY(-50px)'}), {optional: true}),
        query('.message:enter', animate('300ms ease-in-out', style({opacity:1, transform: 'translateY(0)'})), {optional: true}),
      ])
    ])
  ]
})
export class MainPageComponent implements OnInit {

  alert$: Observable<Alert>;

  confirm$: Observable<Confirm>;

  constructor(private store: Store) { }

  ngOnInit() {

    //get alert
    this.alert$ = this.store.select(state => state.ui.alert);

    //get confirm
    this.confirm$ = this.store.select(state => state.ui.confirm);

    //initialize common semantic ui components
    this.initUI();
  }

  initUI() {

    //alert
    $('#alert-container').visibility({
      type: 'fixed',
      offset: $("#navbar").height() + 28
    })

  }//initUI

  /**
   * Dismiss an alert
   * @param alert Alert to be dismissed
   */
  dismissAlert(alert: Alert) {
    //dispatch dismiss alert action
    this.store.dispatch(new DismissAlert(alert));

  }//dismissAlert

}
