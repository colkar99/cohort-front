var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
var UsermoduleComponent = /** @class */ (function () {
    function UsermoduleComponent(formBuilder, apiService, cookieService) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.cookieService = cookieService;
        this.user = {};
        this.userOptions = [];
        this.roles = [];
        this.isRolesAvailable = false;
        this.all_users = [];
        this.createUserForm();
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
    }
    UsermoduleComponent.prototype.ngOnInit = function () {
        this.getUsersList();
    };
    UsermoduleComponent.prototype.createUserForm = function () {
        this.user = this.formBuilder.group({
            user: this.formBuilder.group({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                user_type: ''
            }),
            role: this.formBuilder.group({
                role_id: ''
            })
        });
        this.userOptions = [
            { name: "Site user", value: "site" },
            { name: "Mentor user", value: "mentor" }
        ];
    };
    UsermoduleComponent.prototype.onSubmit = function (user) {
        // console.log(this.user.value);
        var data = JSON.stringify(this.user.value);
        this.apiService.postDataWithToken('create-user-by-admin', data, this.auth)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent.prototype.getRoles = function (user_type_role) {
        var _this = this;
        var data = { user_role_type: user_type_role };
        this.apiService.postDataWithToken('get-roles-user-type', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.roles = data;
            if (data.length > 0)
                _this.isRolesAvailable = true;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    UsermoduleComponent.prototype.getUsersList = function () {
        var _this = this;
        this.apiService.getDataWithAuth('get-all-users', this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.all_users = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent = __decorate([
        Component({
            selector: 'app-usermodule',
            templateUrl: './usermodule.component.html',
            styleUrls: ['./usermodule.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ApiCommunicationService,
            CookieService])
    ], UsermoduleComponent);
    return UsermoduleComponent;
}());
export { UsermoduleComponent };
//# sourceMappingURL=usermodule.component.js.map