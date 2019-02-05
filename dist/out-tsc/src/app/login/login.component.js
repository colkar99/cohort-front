var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ErrorDisplayComponent } from '../error-display/error-display.component';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(apiCom, cookieService, router, sharedData) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.sharedData = sharedData;
        this.loginUrl = "authenticate";
        this.loginForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl('')
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.warn(this.loginForm.value);
        this.apiCom.postData(this.loginUrl, JSON.stringify(this.loginForm.value))
            .subscribe(function (data) {
            console.log("success!", data);
            _this.cookieService.set('Authorization', data.auth_token, 30, '/');
            _this.cookieService.set('user_id', data.user_id, 30, '/');
            _this.cookieService.set('user_type', data.user_type, 30, '/');
            _this.cookieService.set('role', data.roles[0].name, 30, '/');
            _this.newMessage();
            if (data.user_type == "site") {
                // this.router.navigate(['admin/dashboard']);
                if (data.roles[0].name == "site_admin")
                    _this.router.navigate(['admin/dashboard']);
                if (data.roles[0].name == "program_admin")
                    _this.router.navigate(['admin/dashboard/program-controls']);
                if (data.roles[0].name == "program_director")
                    _this.router.navigate(['admin/dashboard/program-controls']);
                if (data.roles[0].name == "contract_manager")
                    _this.router.navigate(['/dashboard/contract-manager']);
            }
            else if (data.user_type == "startup") {
                _this.router.navigate(['startup/dashboard']);
            }
            else if (data.user_type == "mentor") {
                _this.router.navigate(['mentor/dashboard']);
            }
            // this.router.navigate(['/']);
        }, (function (error) {
            console.error("couldn't post because", error);
            _this.errdisplay.openpopup("Warning!!!", error);
        }));
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedData.currentMessage.subscribe(function (message) {
            _this.message = message;
        });
        this.checkStatus = this.getCookie('Authorization');
        var user_type = this.getCookie('user_type');
        if (this.checkStatus.length != 0) {
            debugger;
            this.loggedIn = true;
            this.router.navigate(['/']);
            // window.location.href = '/';
        }
        else {
            this.loggedIn = false;
        }
    };
    LoginComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    LoginComponent.prototype.newMessage = function () {
        this.sharedData.changeMessage('Hello World');
    };
    __decorate([
        ViewChild(ErrorDisplayComponent),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "errdisplay", void 0);
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            SharedDataService])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map