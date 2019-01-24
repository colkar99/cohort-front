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
import { ProgramsComponent } from './programs/programs.component';
import { ProgramsRegistrationComponent } from './programs/registration/programsregistration.component'
import {ProgramControlComponent } from './sitedashboard/programcontrol/programcontrol.component';
import { StartupControlComponent } from './sitedashboard/programcontrol/startupcontrol/startupcontrol.component';
import { ContractManagerComponent } from './sitedashboard/contractmanagercontrol/contractmanager.component';
import { ContractFormComponent } from './sitedashboard/contractmanagercontrol/contractform/contractform.component';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { CurrentStateFormComponent } from './current-state-form/current-state-form.component';
import { AboutProfileComponent } from './about-profile/about-profile.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FrameworkModuleComponent } from './sitedashboard/framework-module/framework-module.component';
import { FrameworkModuleEditComponent} from './sitedashboard/framework-module/framework-edit/framework-edit.component';
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
    CreateProgramComponent,
    ProgramsComponent,
    ProgramsRegistrationComponent,
    ProgramControlComponent,
    StartupControlComponent,
    ContractManagerComponent,
    ContractFormComponent,
    ErrorDisplayComponent,
    CurrentStateFormComponent,
    AboutProfileComponent,
    FrameworkModuleComponent,
    FrameworkModuleEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot() 
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
