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
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
var UsercontrollerComponent = /** @class */ (function () {
    function UsercontrollerComponent(route, location, apiService, cookieService, formBuilder) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.userDatas = [];
        this.user = {};
        this.userOptions = [];
        this.showForm = false;
        this.roles = [];
        this.privileges = [];
        this.modules = [];
        this.privilege = {};
        this.privilegeForm = {};
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
        this.privilegeForm = this.formBuilder.group({
            id: ['', Validators.required],
            module_type_id: ['', Validators.required],
            role_id: ['', Validators.required],
            user_id: ['', Validators.required],
            create_rule: [null, Validators.required],
            update_rule: [null, Validators.required],
            show_rule: [null, Validators.required],
            delete_rule: [null, Validators.required]
        });
    }
    UsercontrollerComponent.prototype.ngOnInit = function () {
        this.getUserData();
    };
    UsercontrollerComponent.prototype.createUserForm = function () {
        this.user = this.formBuilder.group({
            user: this.formBuilder.group({
                id: this.userDatas[0].user.id,
                first_name: this.userDatas[0].user.first_name,
                last_name: this.userDatas[0].user.last_name,
                email: this.userDatas[0].user.email,
                phone_number: this.userDatas[0].user.phone_number,
                user_type: this.userDatas[0].user.user_type
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
    UsercontrollerComponent.prototype.getUserData = function () {
        var _this = this;
        var data = { "user_id": +this.route.snapshot.paramMap.get('id') };
        this.apiService.postDataWithToken('get-user-related-data', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data[0]);
            _this.userDatas = data;
            _this.privileges = data[0].privileges;
            _this.modules = data[0].modules;
            // this.user = data[0].user;
            _this.showForm = true;
            _this.createUserForm();
            _this.getRoles(_this.userDatas[0].user.user_type);
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    UsercontrollerComponent.prototype.getRoles = function (user_type_role) {
        var _this = this;
        var data = { user_role_type: user_type_role };
        this.apiService.postDataWithToken('get-roles-user-type', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.roles = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.onSubmit = function (user) {
        var _this = this;
        // console.log(this.user.value);
        var data = JSON.stringify(this.user.value);
        console.log(data);
        this.apiService.putDataWithToken('update-user-by-admin', data, this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
            alert("User successfully edited by admin");
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.changePrivilegeValue = function (privilege) {
        this.privilege = privilege;
        this.privilegeForm.patchValue({
            id: privilege.id,
            module_type_id: privilege.module_type_id,
            role_id: privilege.role_id,
            user_id: privilege.user_id,
            create_rule: privilege.create_rule,
            update_rule: privilege.update_rule,
            show_rule: privilege.show_rule,
            delete_rule: privilege.delete_rule
        });
    };
    UsercontrollerComponent.prototype.onPrivilegeUpdate = function (privilege) {
        var _this = this;
        var data = { "user_role": this.privilegeForm.value };
        console.log(JSON.stringify(data));
        this.apiService.putDataWithToken('put-user-role', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
            $('#privilegeModel').modal('hide');
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.onPrivilegeCreate = function (privilege) {
        var _this = this;
        var refData = this.privilegeForm.value;
        var data = { "user_role": {
                "user_id": refData.user_id, "role_id": refData.role_id, "module_type_id": refData.module_type_id,
                "create_rule": refData.create_rule, "update_rule": refData.update_rule, "show_rule": refData.show_rule,
                "delete_rule": refData.delete_rule
            } };
        console.log(JSON.stringify(data));
        this.apiService.postDataWithToken('create-user-role-by-admin', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
            $('#createPrivilegemodel').modal('hide');
        }, function (error) {
            console.error("couldn't post because", error);
            $('#createPrivilegemodel').modal('hide');
        });
    };
    UsercontrollerComponent.prototype.deletePrivilegesValue = function (privilege_id) {
        var _this = this;
        var data = { "id": privilege_id };
        var confirmPopup = confirm("Are you sure want to delete this privilege");
        console.log(confirmPopup);
        if (confirmPopup) {
            this.apiService.putDataWithToken('delete-user-role', JSON.stringify(data), this.auth)
                .subscribe(function (data) {
                console.log(data);
                _this.getUserData();
            }, function (error) { return console.error("couldn't post because", error); });
        }
        else {
            return;
        }
    };
    UsercontrollerComponent.prototype.deleteRole = function (user_id, role_id) {
        var _this = this;
        var data = { "user_id": user_id, role_id: role_id };
        var confirmPopup = confirm("Are you sure want to delete this role");
        if (confirmPopup) {
            this.apiService.postDataWithToken('delete-role-user-by-admin', JSON.stringify(data), this.auth)
                .subscribe(function (data) {
                // console.log(data);
                _this.getUserData();
                // $('#createPrivilegemodel').modal('hide');
            }, function (error) {
                console.error("couldn't post because", error);
                // $('#createPrivilegemodel').modal('hide');
            });
        }
        else {
            return;
        }
    };
    UsercontrollerComponent = __decorate([
        Component({
            selector: 'app-usercontroller',
            templateUrl: './usercontroller.component.html',
            styleUrls: ['./usercontroller.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            Location,
            ApiCommunicationService,
            CookieService,
            FormBuilder])
    ], UsercontrollerComponent);
    return UsercontrollerComponent;
}());
export { UsercontrollerComponent };
//# sourceMappingURL=usercontroller.component.js.map