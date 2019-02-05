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
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
var ContractManagerComponent = /** @class */ (function () {
    function ContractManagerComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.site_admin = "site_admin";
        this.contract_manager = "contract_manager";
    }
    ContractManagerComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractManagerComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        this.current_user = this.getCookie('user_id');
        this.program_id = this.getCookie('redirect_id');
        console.log("redirect_id", this.program_id);
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
        this.getAllProgram();
        if (this.program_id != ("" && null && undefined && 0)) {
            this.onChange(this.program_id);
        }
    };
    ContractManagerComponent.prototype.getAllProgram = function () {
        var _this = this;
        var url = "contract-manager-programs";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            _this.program_modules = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ContractManagerComponent.prototype.onChange = function (value) {
        var _this = this;
        debugger;
        var url = "program/show-startup-for-contract";
        var data = { program_id: parseInt(value) };
        debugger;
        this.cookieService.set("redirect_id", value);
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            _this.startups = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ContractManagerComponent = __decorate([
        Component({
            selector: 'app-contractmanager',
            templateUrl: './contractmanager.component.html',
            styleUrls: ['./contractmanager.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router])
    ], ContractManagerComponent);
    return ContractManagerComponent;
}());
export { ContractManagerComponent };
//# sourceMappingURL=contractmanager.component.js.map