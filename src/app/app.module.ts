import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

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
    ResponsiveButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
