import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Alert, ALERT_TYPES } from '../../models/alert.model';
import { Store } from '@ngxs/store';
import { CreateAlert, DismissAlert } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})
export class MyAccountPageComponent implements OnInit {

  currentUser: User;

  sendingMail: boolean = false;

  constructor(
    private auth: AuthService,
    private store: Store
  ) { }

  ngOnInit() {

    //currentUser
    this.auth.currentUser$.subscribe(user => {
      if(user) this.currentUser = user;
    });

    //initialize semantic ui components
    this.initUI();

  }

  get authState() {
    return this.auth.authState$;
  }

  initUI() {
  }

  async resendMail() {

    //start loading
    this.sendingMail = true;

    try {

      //wait for mail to send
      await this.auth.resendVerificationMail();

      //alert success
      const alert: Alert = {
        type: ALERT_TYPES.SUCCESS,
        title: 'Verfication Mail Send',
        content: `A confirmation mail has been send to your email at ${this.currentUser.email}`,
        icon: 'paper plane'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    catch(error) {

      //alert success
      const alert: Alert = {
        type: ALERT_TYPES.ERROR,
        title: 'Couldn\'t send mail.',
        content: `We were not able to complete your request. Please check your internet connection and try again.`,
        icon: 'exclamation circle'
      };

      this.store.dispatch(new CreateAlert(alert));

      //dismiss alert after 3 sec
      setTimeout(() => this.store.dispatch(new DismissAlert(alert)), 3000);

    }

    finally {

      //stop loading
      this.sendingMail = false;

    }

  }


}
