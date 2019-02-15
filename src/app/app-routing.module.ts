import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { SitedashboardComponent } from './sitedashboard/sitedashboard.component';
import { StartupdashboardComponent } from './startupdashboard/startupdashboard.component';
import { UsermoduleComponent } from './sitedashboard/usermodule/usermodule.component';
import { UsercontrollerComponent } from './sitedashboard/usercontroller/usercontroller.component';
import { ProgramModuleComponent } from './sitedashboard/programmodule/programmodule.component';
import { CreateProgramComponent } from './sitedashboard/programmodule/createprogram/createprogram.component';
import { AppComponent } from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramsRegistrationComponent } from './programs/registration/programsregistration.component';
import { ProgramControlComponent } from './sitedashboard/programcontrol/programcontrol.component';
import { StartupControlComponent } from './sitedashboard/programcontrol/startupcontrol/startupcontrol.component';
import { ContractManagerComponent } from './sitedashboard/contractmanagercontrol/contractmanager.component';
import { ContractFormComponent } from './sitedashboard/contractmanagercontrol/contractform/contractform.component';
import { CurrentStateFormComponent } from './current-state-form/current-state-form.component'
import { AboutProfileComponent } from './about-profile/about-profile.component'
import { FrameworkModuleComponent } from './sitedashboard/framework-module/framework-module.component';
import { FrameworkModuleEditComponent } from './sitedashboard/framework-module/framework-edit/framework-edit.component';
import { ContractformSignComponent } from './sitedashboard/contractmanagercontrol/contractform-sign/contractform-sign.component'
import { ContractformEditComponent } from './sitedashboard/contractmanagercontrol/contractform-edit/contractform-edit.component'
import { CourseEditComponent } from './sitedashboard/framework-module/course-edit/course-edit.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { StartupProfileComponent } from './startupdashboard/startup-profile/startup-profile.component'
import { StartupRoadmapComponent } from './startupdashboard/startup-roadmap/startup-roadmap.component'
import { StartupbyProgramsComponent } from './sitedashboard/startupby-programs/startupby-programs.component'
import {EditProgramComponent} from './sitedashboard/programmodule/edit-program/edit-program.component'
import { HomePageComponent } from './home-page/home-page.component';
const routes: Routes = [
  {path: '', component: HomePageComponent},
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/dashboard', component: SitedashboardComponent, pathMatch: 'prefix',
    children: [{ path: 'user', component: UsermoduleComponent },
    { path: 'user/controller/:id', component: UsercontrollerComponent },
    { path: 'program', component: ProgramModuleComponent },
    { path: 'program/create-program', component: CreateProgramComponent },
    { path: 'program/edit-program/:id', component: EditProgramComponent },
    { path: 'program-controls', component: ProgramControlComponent },
    { path: 'program-controls/startup/:id', component: StartupControlComponent },
    { path: 'framework', component: FrameworkModuleComponent },
    { path: 'framework/create-framework', component: FrameworkModuleEditComponent },
    { path: 'framework/edit/:id', component: FrameworkModuleEditComponent },
    { path: 'framework/create-course', component: CourseEditComponent },
    { path: 'framework/editcourse/:id', component: CourseEditComponent },
    { path: 'startups-by-programs', component: StartupbyProgramsComponent },
    { path: 'about-profile', component: AboutProfileComponent },
    { path: 'about-profile/:id', component: AboutProfileComponent },
    ]
  },
  {
    path: 'startup/dashboard', component: StartupdashboardComponent, pathMatch: 'prefix',
    children: [
      { path: 'profile', component: StartupProfileComponent },
      { path: 'road-map', component: StartupRoadmapComponent },


    ]
  },
  { path: 'mentor/dashboard', component: MentordashboardComponent },
  { path: 'live-programs', component: ProgramsComponent },
  { path: 'live-programs/registration/:id', component: ProgramsRegistrationComponent },
  { path: 'dashboard/contract-manager', component: ContractManagerComponent },
  { path: 'dashboard/contract-manager/:id', component: ContractFormComponent },
  { path: 'dashboard/contract-manager/edit/:id', component: ContractformEditComponent },
  { path: 'current-state-form', component: CurrentStateFormComponent },
  { path: 'current-state-form/:id', component: CurrentStateFormComponent },
  { path: 'contract-form-sign', component: ContractformSignComponent },
  { path: 'contract-form-sign/:id', component: ContractformSignComponent },

  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
