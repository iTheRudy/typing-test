import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomePageComponent } from './main-home-page/main-home-page.component';
import {FormsModule} from "@angular/forms";
import { MainCountDownComponent } from './main-count-down/main-count-down.component';
import { MainCalculateTypingSpeedComponent } from './main-calculate-typing-speed/main-calculate-typing-speed.component';



@NgModule({
  declarations: [
    MainHomePageComponent,
    MainCountDownComponent,
    MainCalculateTypingSpeedComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
  ]
})
export class MainModule { }
