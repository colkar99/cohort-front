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
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
var ContractFormComponent = /** @class */ (function () {
    function ContractFormComponent(apiCom, cookieService, router, route) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.site_admin = "site_admin";
        this.contract_manager = "contract_manager";
        this.reviewFormData = {};
        this.startup_id = +this.route.snapshot.paramMap.get('id');
        this.party1_details = {
            p_1_name: "Startup Ignite",
            p_1_address: "Some address, /n some street, /n some villege",
            p_1_phone_number: "8056756218",
            p_1_email: "mail@gmail.com"
        };
    }
    ContractFormComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractFormComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
            if (this.user_role == this.site_admin || this.user_role == this.contract_manager) {
            }
            else {
                this.router.navigate(['/']);
            }
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getStartupReg(this.startup_id);
        this.getAddContractInfo();
    };
    ContractFormComponent.prototype.getStartupReg = function (id) {
        var _this = this;
        var url = "program/startup-application-details";
        var data = { startup_application_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.startup = data.startup_application;
            _this.program = data.program;
            _this.setStartupAddress(_this.startup);
        }, function (error) {
            console.log(error);
        });
    };
    ContractFormComponent.prototype.getAddContractInfo = function () {
        var _this = this;
        var url = "get-contract-additional-information";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            debugger;
            console.log(data);
            _this.addContractInfo = data;
        }, function (error) {
            console.log(error);
        });
    };
    ContractFormComponent.prototype.setStartupAddress = function (startup) {
        this.startup_address = {
            startup_add: startup.startup_address_line_1 + " ,\n    " + startup.startup_address_line_2 + " ,\n    " + startup.startup_city + ",\n    " + startup.startup_state_province_region + ",\n    " + startup.startup_zip_pincode_postalcode + ",\n    " + startup.startup_country
        };
    };
    ContractFormComponent.prototype.onChangeInfo = function (value) {
        var _this = this;
        debugger;
        var id = parseInt(value);
        this.addContractInfo.forEach(function (element) {
            if (element.id === id) {
                _this.selected_add_info = element;
            }
        });
    };
    ContractFormComponent.prototype.onSubmitReview = function (form) {
        debugger;
        this.reviewFormData = form.value;
        $('#reviewFormModal').modal('show');
        console.log(this.reviewFormData);
    };
    ContractFormComponent.prototype.createContract = function (value) {
        var _this = this;
        console.log(value);
        if (value.id == (null || undefined)) {
            var url = "program/startup/create-contract";
            var params = JSON.stringify({ contract_form: value });
            this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                alert("Contract Created Successfully");
                $('#reviewFormModal').modal('hide');
                _this.router.navigate(['dashboard/contract-manager']);
            });
        }
        else {
            var url = "program/startup/update-contract";
            var params = JSON.stringify({ contract_form: value });
            this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                alert("Contract Updated Successfully");
                $('#reviewFormModal').modal('hide');
                _this.router.navigate(['dashboard/contract-manager']);
            });
        }
    };
    ContractFormComponent = __decorate([
        Component({
            selector: 'app-contractmanager',
            templateUrl: './contractform.component.html',
            styleUrls: ['./contractform.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute])
    ], ContractFormComponent);
    return ContractFormComponent;
}());
export { ContractFormComponent };
//# sourceMappingURL=contractform.component.js.map