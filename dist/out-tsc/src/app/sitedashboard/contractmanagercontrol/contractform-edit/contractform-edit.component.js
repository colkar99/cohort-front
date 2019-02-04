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
var ContractformEditComponent = /** @class */ (function () {
    function ContractformEditComponent(apiCom, cookieService, router, route) {
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
    ContractformEditComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractformEditComponent.prototype.ngOnInit = function () {
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
        this.getcontractdetails();
        this.getAddContractInfo();
    };
    ContractformEditComponent.prototype.getcontractdetails = function () {
        var _this = this;
        var url = "program/startup/contract-data-for-startup";
        var params = { startup_registration_id: this.startup_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(params), this.authToken).subscribe(function (res) {
            res;
            _this.contractdetails = res;
            console.log("res,res", res);
            _this.startup = res.startup_application;
            _this.contractdetails = res.contract_form;
        });
    };
    ContractformEditComponent.prototype.setupdate = function () {
        this.editable = true;
    };
    ContractformEditComponent.prototype.onChangeInfo = function (value) {
        var _this = this;
        debugger;
        var id = parseInt(value);
        this.addContractInfo.forEach(function (element) {
            if (element.id === id) {
                _this.selected_add_info = element;
            }
        });
    };
    ContractformEditComponent.prototype.getAddContractInfo = function () {
        var _this = this;
        var url = "get-contract-additional-information";
        this.apiCom.getDataWithAuth(url, this.authToken)
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
    ContractformEditComponent.prototype.onSubmitReview = function (form) {
        var _this = this;
        console.log(form.value);
        var url = "program/startup/update-contract";
        var params = JSON.stringify({ contract_form: form.value });
        this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (res) {
            res;
            alert("Contract form Updated Successfully");
            _this.router.navigate(['dashboard/contract-manager']);
        });
    };
    ContractformEditComponent = __decorate([
        Component({
            selector: 'app-contractform-edit',
            templateUrl: './contractform-edit.component.html',
            styleUrls: ['./contractform-edit.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute])
    ], ContractformEditComponent);
    return ContractformEditComponent;
}());
export { ContractformEditComponent };
//# sourceMappingURL=contractform-edit.component.js.map