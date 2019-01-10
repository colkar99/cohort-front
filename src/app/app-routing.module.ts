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
import {AppComponent } from './app.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramsRegistrationComponent } from './programs/registration/programsregistration.component';
import { ProgramControlComponent } from './sitedashboard/programcontrol/programcontrol.component';
import { StartupControlComponent } from './sitedashboard/programcontrol/startupcontrol/startupcontrol.component';
import { ContractManagerComponent } from  './sitedashboard/contractmanagercontrol/contractmanager.component';
import { ContractFormComponent } from './sitedashboard/contractmanagercontrol/contractform/contractform.component';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin/dashboard', component: SitedashboardComponent,pathMatch: 'prefix',
    children: [{path: 'user', component: UsermoduleComponent},
                {path: 'user/controller/:id', component: UsercontrollerComponent},
                {path: 'program' , component: ProgramModuleComponent},
                {path: 'program/create-program', component: CreateProgramComponent},
                {path: 'program-controls', component: ProgramControlComponent},
                {path: 'program-controls/startup/:id', component: StartupControlComponent}
              ]},
  {path: 'startup/dashboard', component: StartupdashboardComponent},
  {path: 'mentor/dashboard', component: MentordashboardComponent},
  {path: 'live-programs', component: ProgramsComponent},
  {path: 'live-programs/registration/:id', component: ProgramsRegistrationComponent},
  {path: 'dashboard/contract-manager' ,component: ContractManagerComponent},
  {path: 'dashboard/contract-manager/:id', component: ContractFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
