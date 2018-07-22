import { NgModule } from "../../node_modules/@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { MyAccountPageComponent } from "./pages/my-account-page/my-account-page.component";
import { MyAddressPageComponent } from "./pages/my-address-page/my-address-page.component";
import { MyOrdersPageComponent } from "./pages/my-orders-page/my-orders-page.component";
import { AuthGuard } from "./guards/auth.guard";

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
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'store',
        pathMatch: "full"
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