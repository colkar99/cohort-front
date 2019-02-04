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
var ContractformSignComponent = /** @class */ (function () {
    function ContractformSignComponent(apiCom, cookieService, router, route) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.site_admin = "site_admin";
        this.contract_manager = "contract_manager";
        this.contractdetails = {};
        this.startup = {};
        this.editable = false;
        this.startup_id = +this.route.snapshot.paramMap.get('id');
    }
    ContractformSignComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractformSignComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        this.getcontractdetails();
        //this.getAddContractInfo()
    };
    ContractformSignComponent.prototype.getcontractdetails = function () {
        var _this = this;
        var url = "program/startup/contract-data-for-startup";
        var params = { startup_registration_id: this.startup_id };
        this.apiCom.postData(url, JSON.stringify(params)).subscribe(function (res) {
            res;
            _this.contractdetails = res;
            console.log("res,res", res);
            _this.startup = res.startup_application;
            _this.contractdetails = res.contract_form;
            _this.selected_add_info = res.additional_contract_information;
        }, (function (err) {
            alert("Contract Form Not Found, Please Contact Admin");
        }));
    };
    ContractformSignComponent.prototype.setupdate = function () {
        this.editable = true;
    };
    ContractformSignComponent.prototype.onChangeInfo = function (value) {
        var _this = this;
        debugger;
        var id = parseInt(value);
        this.addContractInfo.forEach(function (element) {
            if (element.id === id) {
                _this.selected_add_info = element;
            }
        });
    };
    ContractformSignComponent.prototype.getAddContractInfo = function () {
        var _this = this;
        var url = "get-contract-additional-information";
        this.apiCom.getDataWithoutAuth(url)
            .subscribe(function (data) {
            debugger;
            console.log(data);
            _this.addContractInfo = data;
            if (_this.contractdetails.additional_contract_information_id != (null && undefined && 0)) {
                _this.onChangeInfo(_this.contractdetails.additional_contract_information_id);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ContractformSignComponent.prototype.onSubmitReview = function (form) {
        var _this = this;
        if (this.tcondtions == true) {
            var url = "program/startup/startup-response-contract";
            var params = {
                contract_form: {
                    id: form.value.id,
                    startup_registration_id: form.value.startup_registration_id,
                    accept_terms_condition: true
                }
            };
            this.apiCom.postData(url, params).subscribe(function (res) {
                res;
                alert("Contract form Signed Successfully");
                _this.router.navigate(['/']);
            });
        }
        else {
            alert("Please accept the terms and conditions");
        }
        console.log(form.value);
    };
    ContractformSignComponent.prototype.terms = function (value) {
        this.tcondtions = value;
    };
    ContractformSignComponent = __decorate([
        Component({
            selector: 'app-contractform-sign',
            templateUrl: './contractform-sign.component.html',
            styleUrls: ['./contractform-sign.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute])
    ], ContractformSignComponent);
    return ContractformSignComponent;
}());
export { ContractformSignComponent };
//# sourceMappingURL=contractform-sign.component.js.map