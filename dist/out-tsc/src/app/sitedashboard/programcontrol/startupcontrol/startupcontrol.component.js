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
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrentstateFormVO } from '../../../CurrentStateFormVO';
var StartupControlComponent = /** @class */ (function () {
    function StartupControlComponent(apiCom, cookieService, router, route) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.startup = {};
        this.currentstateedit = true;
        this.startup_id = +this.route.snapshot.paramMap.get('id');
        this.currentstateform = new CurrentstateFormVO();
    }
    StartupControlComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    StartupControlComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getStartupRegQues();
        this.getStartUp();
    };
    StartupControlComponent.prototype.getStartUp = function () {
        var _this = this;
        var url = "program/startup-application-details";
        var data = { startup_application_id: this.startup_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.startup = data.startup_application;
            if (_this.startup.current_state_form_reviewed == false) {
                _this.currentstateedit = false;
            }
            else {
                _this.currentstateedit = true;
            }
            if (_this.startup.application_status != "PR" && _this.startup.application_status != "RP" && _this.startup.application_status != "RC" && _this.startup.application_status != "CSFI") {
                var url_1 = "program/user/show-current-state-form";
                var params = {
                    "current_state_form": {
                        "program_id": _this.startup.program_id,
                        "startup_registration_id": _this.startup_id
                    }
                };
                _this.apiCom.postDataWithToken(url_1, params, _this.authToken).subscribe(function (res) {
                    res;
                    _this.currentstateform = res;
                    console.log(_this.currentstateform);
                }, function (err) {
                    alert(err);
                });
            }
            debugger;
        }, function (error) {
            debugger;
            console.log(error);
        });
    };
    StartupControlComponent.prototype.getStartupRegQues = function () {
        var _this = this;
        debugger;
        var url = "get-program-question-response";
        var data = { startup_registration_id: this.startup_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.appRespQues = data;
        }, function (error) {
            console.log(data);
        });
    };
    StartupControlComponent.prototype.submitAdminResponse = function (form) {
        var _this = this;
        var url = "admin-feedback-for-startup-response";
        var data = { application_questions_response: form.value };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.getStartupRegQues();
            _this.appRespQues;
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.requestCurrentStateForm = function (id) {
        var url = "program/admin/request-current-form";
        var data = { startup_registration_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.sendReminderForCurrent = function (id) {
        var url = "gentle-reminder";
        var data = { startup_registration_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.submitCSFS = function () {
        var _this = this;
        if (this.currentstateform.reviewer_rating != "" && this.currentstateform.reviewer_rating != (null && undefined)) {
            var total = 0;
            this.currentstateform.total_rating = 0;
            for (var i = 0; i < this.appRespQues.length; i++) {
                total += this.appRespQues[i].reviewer_rating;
            }
            this.currentstateform.total_rating = Number(this.currentstateform.reviewer_rating) + Number(total);
            var url;
            if (this.startup.current_state_form_reviewed == false) {
                url = "program/admin/response-current-state-form";
            }
            else {
                url = "program/admin/edit-current-state-form-admin";
            }
            var params = JSON.stringify({ "current_state_form": this.currentstateform });
            this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (data) {
                console.log(data);
                _this.response = data;
                _this.currentstateedit = true;
                _this.currentstateform = _this.response.current_state_form;
                _this.startup = _this.response.startup_registration;
            }, function (error) {
                console.log(error);
            });
        }
    };
    StartupControlComponent.prototype.startupAccept = function () {
        debugger;
        var url = "startup-accept-by-admin";
        var data = { startup_registration_id: this.startup_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log("acceptdata" + data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.startupReject = function () {
        debugger;
        var url = "startup-reject-by-admin";
        var data = { startup_registration_id: this.startup_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log("rejectdata" + data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent = __decorate([
        Component({
            selector: 'app-startupcontrol',
            templateUrl: './startupcontrol.component.html',
            styleUrls: ['./startupcontrol.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute])
    ], StartupControlComponent);
    return StartupControlComponent;
}());
export { StartupControlComponent };
//# sourceMappingURL=startupcontrol.component.js.map