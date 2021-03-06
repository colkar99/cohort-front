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
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
var SitedashboardComponent = /** @class */ (function () {
    function SitedashboardComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.getUserUrl = 'get-user-details';
    }
    SitedashboardComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    SitedashboardComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    SitedashboardComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getUserDetails();
    };
    SitedashboardComponent = __decorate([
        Component({
            selector: 'app-sitedashboard',
            templateUrl: './sitedashboard.component.html',
            styleUrls: ['./sitedashboard.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router])
    ], SitedashboardComponent);
    return SitedashboardComponent;
}());
export { SitedashboardComponent };
//# sourceMappingURL=sitedashboard.component.js.map