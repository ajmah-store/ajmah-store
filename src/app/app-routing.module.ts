import { NgModule } from "../../node_modules/@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { MyAccountPageComponent } from "./pages/my-account-page/my-account-page.component";
import { MyAddressPageComponent } from "./pages/my-address-page/my-address-page.component";
import { MyOrdersPageComponent } from "./pages/my-orders-page/my-orders-page.component";
import { AuthGuard } from "./guards/auth.guard";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ErrorPageComponent } from "./pages/error-page/error-page.component";

const routes: Routes = [
    {
        path: 'store',
        component: MainPageComponent,
        children: [
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'home',
                component: HomePageComponent
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'my-account',
                        component: MyAccountPageComponent
                    },
                    {
                        path: 'my-address',
                        component: MyAddressPageComponent
                    },
                    {
                        path: 'my-orders',
                        component: MyOrdersPageComponent
                    },
                    {
                        path: '',
                        redirectTo: 'my-account',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'store',
        pathMatch: "full"
    },
    {
        path: '**',
        component: ErrorPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}