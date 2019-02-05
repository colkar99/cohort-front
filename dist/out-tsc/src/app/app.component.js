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
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from './shared-data.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(cookieService, router, sharedData) {
        this.cookieService = cookieService;
        this.router = router;
        this.sharedData = sharedData;
        this.title = 'cohort';
        // this.detect.detectChanges();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.cookieService.set( 'appCookie', 'This is hello apps.' );
        this.sharedData.currentMessage.subscribe(function (message) {
            _this.message = message;
            _this.loggedIn = true;
        });
        this.checkStatus = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        if (this.checkStatus.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
        // console.log(this.testCock);
    };
    AppComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    AppComponent.prototype.deleteCookie = function (key) {
        debugger;
        return this.cookieService.deleteAll('/');
    };
    AppComponent.prototype.logout = function () {
        this.deleteCookie('Authorization');
        this.deleteCookie('role');
        this.loggedIn = false;
        // this.detect.detectChanges();
        this.router.navigate(['/']);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            Router,
            SharedDataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map