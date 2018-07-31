import { Component, OnInit, OnDestroy } from '@angular/core';
import { primary_menu, user_menu, FUNCTIONS } from '../../constants';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { OpenCart } from '../../store/actions/ui.actions';

const content = [
  {
      "title": "McCain French Fries",
      "image": "https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fproducts%2FwqEbunhdsGHmG5k9wNW4?alt=media&token=9bffc043-9c6b-40b9-a241-ee0d0b256a1b",
      "price": 30,
      "description": "Category:Bakery.Delicious Crispy and Tasty French Fries"
  },
  {
      "title": "Ayrvedic Paste",
      "image": "https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fproducts%2Fxc4r6DVONTBYBtcGKCrf?alt=media&token=196c4d81-9903-4581-bd06-2ec1c89a9964",
      "price": 399,
      "description": "Category:Grocerry.No"
  },
  {
      "title": "Bakery",
      "image": "https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fcategories%2F3rLLQ7jeRZpqwtBg5nto?alt=media&token=29869d75-1d3b-49d4-9523-7fa4b34ec5b2",
      "description": "Bakery in Categories"
  },
  {
      "title": "Fruits",
      "image": "https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fcategories%2FCewCqCCX3lGgfe9QwIHI?alt=media&token=f51e35ae-591a-4095-8fa7-55a42af20648",
      "description": "Fruits in Categories"
  },
  {
      "title": "Grocerry",
      "image": "https://firebasestorage.googleapis.com/v0/b/ajmah-2a334.appspot.com/o/images%2Fcategories%2FR0hDHzKkKd9QmNNplJJJ?alt=media&token=8f5787f1-070e-4790-8614-7ec3d7fe18ba",
      "description": "Grocerry in Categories"
  }
];

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
    private store: Store,
    // private http: HttpClient
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
      apiSettings: {
        onResponse: (resp) => {

          console.log(resp);

          const results = resp.results.map(res => {

            let type:string;

            if(res.price) type = 'product';
            else type = 'category'

            return {
              "title": res.title,
              "description": res.description,
              "image": res.image,
              "url": `${type}/${res.id}`
            }

          });

          console.log(results);

          return {
            "success": (!!resp).toString(),
            "results": results
          }

        },
        url: `${FUNCTIONS.HOST_URL}/${FUNCTIONS.API.searchProduct}/{query}`
      },
      minCharacters: 3,
    });

    // this.http.get('https://us-central1-ajmah-2a334.cloudfunctions.net/api/searchProduct/mc').toPromise()
    // .then(resp => console.log(resp))
    // .catch(error=>console.log(error));

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
