import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

// @ts-ignore
// @ts-ignore
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ],
    providers: [
        HttpClientModule,
        HttpClient
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
