import { NgModule } from "../../node_modules/@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { MainPageComponent } from "./pages/main-page/main-page.component";

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