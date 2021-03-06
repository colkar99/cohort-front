var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MentordashboardComponent } from './mentordashboard/mentordashboard.component';
import { SitedashboardComponent } from './sitedashboard/sitedashboard.component';
import { StartupdashboardComponent } from './startupdashboard/startupdashboard.component';
import { UsermoduleComponent } from './sitedashboard/usermodule/usermodule.component';
import { UsercontrollerComponent } from './sitedashboard/usercontroller/usercontroller.component';
import { ProgramModuleComponent } from './sitedashboard/programmodule/programmodule.component';
import { CreateProgramComponent } from './sitedashboard/programmodule/createprogram/createprogram.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramsRegistrationComponent } from './programs/registration/programsregistration.component';
import { ProgramControlComponent } from './sitedashboard/programcontrol/programcontrol.component';
import { StartupControlComponent } from './sitedashboard/programcontrol/startupcontrol/startupcontrol.component';
import { ContractManagerComponent } from './sitedashboard/contractmanagercontrol/contractmanager.component';
import { ContractFormComponent } from './sitedashboard/contractmanagercontrol/contractform/contractform.component';
import { CurrentStateFormComponent } from './current-state-form/current-state-form.component';
import { AboutProfileComponent } from './about-profile/about-profile.component';
import { FrameworkModuleComponent } from './sitedashboard/framework-module/framework-module.component';
import { FrameworkModuleEditComponent } from './sitedashboard/framework-module/framework-edit/framework-edit.component';
import { ContractformSignComponent } from './sitedashboard/contractmanagercontrol/contractform-sign/contractform-sign.component';
import { ContractformEditComponent } from './sitedashboard/contractmanagercontrol/contractform-edit/contractform-edit.component';
import { CourseEditComponent } from './sitedashboard/framework-module/course-edit/course-edit.component';
var routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'admin/dashboard', component: SitedashboardComponent, pathMatch: 'prefix',
        children: [{ path: 'user', component: UsermoduleComponent },
            { path: 'user/controller/:id', component: UsercontrollerComponent },
            { path: 'program', component: ProgramModuleComponent },
            { path: 'program/create-program', component: CreateProgramComponent },
            { path: 'program-controls', component: ProgramControlComponent },
            { path: 'program-controls/startup/:id', component: StartupControlComponent },
            { path: 'framework', component: FrameworkModuleComponent },
            { path: 'framework/edit', component: FrameworkModuleEditComponent },
            { path: 'framework/edit/:id', component: FrameworkModuleEditComponent },
            { path: 'framework/editcourse', component: CourseEditComponent },
            { path: 'framework/editcourse/:id', component: CourseEditComponent }
        ]
    },
    { path: 'startup/dashboard', component: StartupdashboardComponent },
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
    { path: 'about-profile', component: AboutProfileComponent },
    { path: 'about-profile/:id', component: AboutProfileComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map