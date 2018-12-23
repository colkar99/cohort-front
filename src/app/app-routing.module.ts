import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { SitedashboardComponent } from './sitedashboard/sitedashboard.component';
import { StartupdashboardComponent } from './startupdashboard/startupdashboard.component';
import { UsermoduleComponent } from './sitedashboard/usermodule/usermodule.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'admin/dashboard', component: SitedashboardComponent,
    children: [{path: 'user', component: UsermoduleComponent}] },
  {path: 'startup/dashboard', component: StartupdashboardComponent},
  {path: 'mentor/dashboard', component: MentordashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
