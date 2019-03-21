import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts)
// social login google
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider } from "angular4-social-login";
import { FullCalendarModule } from 'ng-fullcalendar';


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
import { ContractformSignComponent } from './sitedashboard/contractmanagercontrol/contractform-sign/contractform-sign.component';
import { ContractformEditComponent } from './sitedashboard/contractmanagercontrol/contractform-edit/contractform-edit.component';
import { CourseEditComponent } from './sitedashboard/framework-module/course-edit/course-edit.component';{}
import {SharedDataService} from './shared-data.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StartupProfileComponent } from './startupdashboard/startup-profile/startup-profile.component'
import { sharingData } from './sharingdata';
import { StartupRoadmapComponent } from './startupdashboard/startup-roadmap/startup-roadmap.component';
import { StartupbyProgramsComponent } from './sitedashboard/startupby-programs/startupby-programs.component';
import { EditProgramComponent } from './sitedashboard/programmodule/edit-program/edit-program.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ChartsBoardComponent } from './sitedashboard/charts-board/charts-board.component'
import {ProgramSessionComponent } from './startupdashboard/program-sessions/program-sessions.component';
import { ProgramSessionsComponent } from './sitedashboard/program-sessions/program-sessions.component';
import { CreateProgramSessionsComponent } from './sitedashboard/create-program-sessions/create-program-sessions.component';
import { AssignActivitiesComponent } from './about-profile/assign-activities/assign-activities.component';
import { ViewActivitiesComponent } from './about-profile/view-activities/view-activities.component';
import { ProfileDetailsComponent } from './about-profile/profile-details/profile-details.component'
import {StartupRoadmapComponentadmin} from './about-profile/startup-roadmap/startup-roadmap.component';
import { ViewMaterialsComponent } from './about-profile/view-materials/view-materials.component';
import { ViewActivityComponent } from './startupdashboard/view-activity/view-activity.component';
import { CourseMaterialComponent } from './startupdashboard/course-material/course-material.component'
import { CKEditorModule } from 'ng2-ckeditor';
import { MyAccountComponent } from './my-account/my-account.component';
import { ImageCompressService,ResizeOptions,ImageUtilityService } from 'ng2-image-compress';
import { StartupUpdatesComponent } from './startupdashboard/startup-updates/startup-updates.component';
import { ActionCableService, Channel } from 'angular2-actioncable';

export function provideConfig() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("132143603340-0tg4t5r2bu67tg4fhs5loqjojkc0ejmd.apps.googleusercontent.com")
    }
    // ,
    // {
    //   id: FacebookLoginProvider.PROVIDER_ID,
    //   provider: new FacebookLoginProvider("Facebook-App-Id")
    // }
  ]);
  return config;
}
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
    FrameworkModuleEditComponent,
    ContractformSignComponent,
    ContractformEditComponent,
    CourseEditComponent,
    ResetPasswordComponent,
    StartupProfileComponent,
    StartupRoadmapComponent,
    StartupbyProgramsComponent,
    EditProgramComponent,
    HomePageComponent,
    ChartsBoardComponent,
    ProgramSessionComponent,
    ProgramSessionsComponent,
    CreateProgramSessionsComponent,
    AssignActivitiesComponent,
    ViewActivitiesComponent,
    ProfileDetailsComponent,
    StartupRoadmapComponentadmin,
    ViewMaterialsComponent,
    ViewActivityComponent,
    CourseMaterialComponent,
    MyAccountComponent,
    StartupUpdatesComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FusionChartsModule,
    SocialLoginModule,
    FullCalendarModule,
    Ng4LoadingSpinnerModule.forRoot() 
  ],
  providers: [CookieService,SharedDataService,sharingData,ActionCableService,
              {provide: AuthServiceConfig,useFactory: provideConfig},ImageCompressService,ResizeOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
