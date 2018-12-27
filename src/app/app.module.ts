import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { SitedashboardComponent } from './sitedashboard/sitedashboard.component';
import { UsermoduleComponent } from './sitedashboard/usermodule/usermodule.component';
import { UsercontrollerComponent } from './sitedashboard/usercontroller/usercontroller.component';
import { StartupdashboardComponent } from './startupdashboard/startupdashboard.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { ProgramModuleComponent } from './sitedashboard/programmodule/programmodule.component'
import { CreateProgramComponent } from './sitedashboard/programmodule/createprogram/createprogram.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SitedashboardComponent,
    StartupdashboardComponent,
    MentordashboardComponent,
    UsermoduleComponent,
    UsercontrollerComponent,
    ProgramModuleComponent,
    CreateProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
