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
var ProgramModuleComponent = /** @class */ (function () {
    function ProgramModuleComponent(cookieService, formBuilder, apiService) {
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.program_modules = [];
        this.program_type_edit = false;
        this.program_location_edit = false;
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
    ProgramModuleComponent.prototype.ngOnInit = function () {
        this.getAllProgram();
        this.initForm();
    };
    ProgramModuleComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ProgramModuleComponent.prototype.getAllProgram = function () {
        var _this = this;
        this.apiService.getDataWithAuth("show-programs", this.auth)
            .subscribe(function (data) {
            _this.program_modules = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ProgramModuleComponent.prototype.initForm = function () {
        this.program_type = {
            "program_type_title": "",
            "program_type_description": "",
            "program_type_duration": 1,
            "program_type_logo": "",
            "program_type_main_image": ""
        };
        this.program_location = {
            "address_line_1": "",
            "address_line_2": "",
            "city": "",
            "state_province_region": "",
            "zip_pincode_postalcode": "",
            "country": ""
        };
    };
    ProgramModuleComponent.prototype.initProgramTypeValue = function (program_type) {
        console.log(program_type);
        this.program_type = {
            "id": program_type.id,
            "program_type_title": program_type.program_type_title,
            "program_type_description": program_type.program_type_description,
            "program_type_duration": program_type.program_type_duration,
            "program_type_logo": program_type.program_type_logo,
            "program_type_main_image": program_type.program_type_main_image
        };
        this.program_type_edit = true;
    };
    ProgramModuleComponent.prototype.initProgramlocationValue = function (program_location) {
        console.log(program_location);
        this.program_location = {
            "id": program_location.id,
            "address_line_1": program_location.address_line_1,
            "address_line_2": program_location.address_line_2,
            "city": program_location.city,
            "state_province_region": program_location.state_province_region,
            "zip_pincode_postalcode": program_location.zip_pincode_postalcode,
            "country": program_location.country
        };
        this.program_location_edit = true;
        $('#programLocationmodel').modal('show');
    };
    ProgramModuleComponent.prototype.submitProgramType = function (form, type) {
        var _this = this;
        debugger;
        var url;
        var data;
        if (type === 'type') {
            url = "create-program-type";
            data = { program_type: form.value };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        }
        else if (type === 'location') {
            url = "create-program-location";
            data = { program_location: form.value };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        }
        this.apiService.postDataWithToken(url, JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getAllProgram();
        }, function (error) {
            console.log(error);
        });
    };
    ProgramModuleComponent.prototype.updateProgramType = function (form, type) {
        var _this = this;
        debugger;
        var url;
        var data;
        if (type === 'type') {
            url = "edit-program-type";
            data = { program_type: form.value };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        }
        else if (type === 'location') {
            url = "edit-program-location";
            data = { program_location: form.value };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        }
        this.apiService.putDataWithToken(url, JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getAllProgram();
        }, function (error) {
            console.log(error);
        });
    };
    ProgramModuleComponent.prototype.deleteProgramType = function (id, type) {
        var _this = this;
        var url;
        var data;
        if (type === 'type') {
            url = "delete-program-type";
            data = { program_type: { id: id } };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        }
        else if (type === 'location') {
            url = "delete-program-location";
            data = { program_location: { id: id } };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        }
        this.apiService.postDataWithToken(url, JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getAllProgram();
        }, function (error) {
            console.log(error);
        });
    };
    ProgramModuleComponent = __decorate([
        Component({
            selector: 'app-programmodule',
            templateUrl: './programmodule.component.html',
            styleUrls: ['./programmodule.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            FormBuilder,
            ApiCommunicationService])
    ], ProgramModuleComponent);
    return ProgramModuleComponent;
}());
export { ProgramModuleComponent };
//# sourceMappingURL=programmodule.component.js.map