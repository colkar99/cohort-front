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
import { SharedDataService } from '../../shared-data.service';
var FrameworkModuleComponent = /** @class */ (function () {
    function FrameworkModuleComponent(apiCom, cookieService, router, shareddata) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.shareddata = shareddata;
        this.getUserUrl = 'get-user-details';
    }
    FrameworkModuleComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    FrameworkModuleComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    FrameworkModuleComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getUserDetails();
        this.getAllFrameWorks();
        this.getAllCourses();
    };
    FrameworkModuleComponent.prototype.getAllFrameWorks = function () {
        var _this = this;
        var url = "program/show-all-framworks";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.frameworks = data;
        }, function (error) {
            console.log(error);
        });
    };
    FrameworkModuleComponent.prototype.getAllCourses = function () {
        var _this = this;
        var url = "framework/course/view-all";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.courses = data;
        }, function (error) {
            console.log(error);
        });
    };
    FrameworkModuleComponent.prototype.setsourceedit = function (course) {
        this.shareddata.changeMessage(course);
    };
    FrameworkModuleComponent = __decorate([
        Component({
            selector: 'app-sitedashboard-framework-module',
            templateUrl: './framework-module.component.html',
            styleUrls: ['./framework-module.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            SharedDataService])
    ], FrameworkModuleComponent);
    return FrameworkModuleComponent;
}());
export { FrameworkModuleComponent };
//# sourceMappingURL=framework-module.component.js.map