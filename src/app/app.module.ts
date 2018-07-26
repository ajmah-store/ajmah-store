import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage'
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { firebase_config } from '../private/firebase.config'; 
import { StoreModule } from './store/store.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { FooterComponent } from './partials/footer/footer.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyAccountPageComponent } from './pages/my-account-page/my-account-page.component';
import { MyAddressPageComponent } from './pages/my-address-page/my-address-page.component';
import { MyOrdersPageComponent } from './pages/my-orders-page/my-orders-page.component';
import { ProfileDetailsComponent } from './partials/profile-details/profile-details.component';
import { LoginSecurityDetailsComponent } from './partials/login-security-details/login-security-details.component';
import { ResponsiveButtonComponent } from './components/responsive-button/responsive-button.component';
import { AddressComponent } from './components/address/address.component';
import { AddAddressComponent } from './partials/add-address/add-address.component';
import { InputCalendarComponent } from './components/input-calendar/input-calendar.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { EditAddressComponent } from './partials/edit-address/edit-address.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SalesSliderComponent } from './partials/sales-slider/sales-slider.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './partials/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    MainPageComponent,
    FooterComponent,
    ProfilePageComponent,
    MyAccountPageComponent,
    MyAddressPageComponent,
    MyOrdersPageComponent,
    ProfileDetailsComponent,
    LoginSecurityDetailsComponent,
    ResponsiveButtonComponent,
    AddressComponent,
    AddAddressComponent,
    InputCalendarComponent,
    ConfirmComponent,
    EditAddressComponent,
    HomePageComponent,
    SalesSliderComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase_config),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),//offline data
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    StoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
