import { Component, OnInit, OnDestroy } from '@angular/core';
import { primary_menu, user_menu } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { OpenCart } from '../../store/actions/ui.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  menuLinks = primary_menu;
  userLinks = user_menu;

  currentUser: User;

  //subscriptions
  subscriptions = new Subscription();

  constructor(
    private auth: AuthService,
    private store: Store
  ) { }

  ngOnInit() {

    this.initUI();

    this.subscriptions.add(this.auth.currentUser$.subscribe(user => (this.currentUser = user)));

  }

  //check authentucation
  get authenticated() {

    return this.auth.authState$;

  }

  /**
   * Initialize Semantic-UI Components
   */
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

    $('.ui.dropdown').dropdown({
      action: 'hide'
    });

    //sticky navbar
    $('#navbar').visibility({
      type: 'fixed'
    });
  }

  //logout
  logout() {
    this.auth.logout();
  }
  

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openCart() {

    this.store.dispatch(new OpenCart());

  }

}
