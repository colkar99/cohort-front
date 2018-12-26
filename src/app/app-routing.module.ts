import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { SitedashboardComponent } from './sitedashboard/sitedashboard.component';
import { StartupdashboardComponent } from './startupdashboard/startupdashboard.component';
import { UsermoduleComponent } from './sitedashboard/usermodule/usermodule.component';
import { UsercontrollerComponent } from './sitedashboard/usercontroller/usercontroller.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin/dashboard', component: SitedashboardComponent,pathMatch: 'prefix',
    children: [{path: 'user', component: UsermoduleComponent},
                {path: 'user/controller/:id', component: UsercontrollerComponent}
              ]},
  {path: 'startup/dashboard', component: StartupdashboardComponent},
  {path: 'mentor/dashboard', component: MentordashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
