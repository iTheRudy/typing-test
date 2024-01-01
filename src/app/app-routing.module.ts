import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainModule} from "./main/main.module";
import {MAIN_ROUTES} from "./main/main.routes";

export const ROUTES: Routes = [
    {path: 'main', children: MAIN_ROUTES,},
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: '**', redirectTo: 'main', pathMatch: 'full'}

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES), MainModule],
    exports: [RouterModule]
})
export class AppRoutingModule {


}
