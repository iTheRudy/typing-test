import {Routes} from "@angular/router";
import {MainHomePageComponent} from "./main-home-page/main-home-page.component";

export const MAIN_ROUTES: Routes = [
    {path: 'home', component: MainHomePageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
]
