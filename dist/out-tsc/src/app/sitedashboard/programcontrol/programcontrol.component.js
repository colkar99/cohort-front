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
var ProgramControlComponent = /** @class */ (function () {
    function ProgramControlComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.getUserUrl = 'get-user-details';
        this.showStartup = false;
        this.formrequestarray = [];
    }
    ProgramControlComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ProgramControlComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    ProgramControlComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.location_program_id = this.getCookie('program_id');
        console.log("location_program_id", this.location_program_id);
        if (this.authToken.length != 0) {
            debugger;
            if (this.location_program_id.length != 0) {
                this.showStartups(this.location_program_id);
            }
        }
        this.getUserDetails();
        this.getAllProgram();
    };
    ProgramControlComponent.prototype.getAllProgram = function () {
        var _this = this;
        this.apiCom.getDataWithoutAuth('get-list-of-programs')
            .subscribe(function (data) {
            //   this.allPrograms = data;
            _this.livePrograms = data.all_programs.live;
            _this.expPrograms = data.all_programs.exp;
            console.log(data);
            console.log(data.all_programs.live);
            console.log(data.all_programs.exp);
            _this.setStatusForPrograms(data);
        }, function (error) {
            console.log("The following error has been occured: " + error);
        });
    };
    ProgramControlComponent.prototype.setStatusForPrograms = function (programs) {
        this.allPrograms = [];
        for (var _i = 0, _a = programs.all_programs.live; _i < _a.length; _i++) {
            var data = _a[_i];
            console.log(data);
            data["status"] = "Running";
            this.allPrograms.push(data);
        }
        for (var _b = 0, _c = programs.all_programs.exp; _b < _c.length; _b++) {
            var data = _c[_b];
            console.log(data);
            data["status"] = "Expired";
            this.allPrograms.push(data);
        }
        console.log(this.allPrograms);
        var pr_id = this.getCookie('program_id');
        this.programselected = pr_id;
        if (pr_id != (null && undefined && 0)) {
            this.showStartups(pr_id);
        }
    };
    ProgramControlComponent.prototype.showStartups = function (id) {
        var _this = this;
        debugger;
        var data = { "program_id": id };
        this.cookieService.set('program_id', id, 30, '/admin/dashboard/program-controls');
        var url = "program/show-startup-program-wise";
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            debugger;
            console.log(data);
            _this.allStartups = data;
            _this.allStartups.sort(function (a, b) { if (a.score < b.score) {
                return 1;
            } if (a.score > b.score) {
                return -1;
            } });
            console.log("this.allStartups" + _this.allStartups);
            _this.showStartup = true;
        }, function (error) {
            console.log(error);
        });
    };
    ProgramControlComponent.prototype.getStartupRegQues = function (startup_id, program_id, startup) {
        var _this = this;
        debugger;
        this.startup = startup;
        var url = "get-program-question-response";
        var data = { startup_registration_id: startup_id, program_id: program_id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.appRespQues = data;
            debugger;
        }, function (error) {
            console.log(data);
        });
    };
    ProgramControlComponent.prototype.submitAdminResponse = function (form) {
        debugger;
    };
    ProgramControlComponent.prototype.setarray = function (checked, item) {
        if (checked == true) {
            this.formrequestarray.push(item.id);
            console.log("reqarray", this.formrequestarray);
        }
        else {
            if (checked == false) {
                var deleteindex = this.formrequestarray.indexOf(item.id);
                console.log(deleteindex);
                if (deleteindex != -1) {
                    this.formrequestarray.splice(deleteindex, 1);
                    console.log("this.formrequestarray", this.formrequestarray);
                }
            }
        }
    };
    ProgramControlComponent.prototype.initiatecsfi = function () {
        var _this = this;
        if (this.formrequestarray.length > 0) {
            var url = "program/admin/request-current-form";
            var params = JSON.stringify({ "startup_app_ids": this.formrequestarray });
            this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                var id = _this.getCookie("program_id");
                _this.showStartups(id);
                _this.formrequestarray = [];
                alert("Current State Form Initiated");
            }, function (err) {
                alert(err);
            });
        }
        else {
            alert("Select atleast One Startup Company");
        }
    };
    ProgramControlComponent.prototype.startupAccept = function () {
        var _this = this;
        debugger;
        if (this.formrequestarray.length > 0) {
            var url = "startup-accept-by-admin-bulk";
            var data = { startup_app_ids: this.formrequestarray };
            this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
                .subscribe(function (data) {
                console.log("acceptdata" + data);
                var id = _this.getCookie("program_id");
                alert("Startups Accepted Successfully");
                _this.showStartups(id);
                _this.formrequestarray = [];
            }, function (error) {
                console.log(error);
            });
        }
        else {
            alert("Select atleast One Startup Company");
        }
    };
    ProgramControlComponent.prototype.startupReject = function () {
        var _this = this;
        debugger;
        if (this.formrequestarray.length > 0) {
            var url = "startup-reject-by-admin-bulk";
            var data = { startup_app_ids: this.formrequestarray };
            this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
                .subscribe(function (data) {
                var id = _this.getCookie("program_id");
                alert("Startups Rejected Successfully");
                _this.showStartups(id);
                _this.formrequestarray = [];
                console.log("rejectdata" + data);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            alert("Select atleast One Startup Company");
        }
    };
    ProgramControlComponent = __decorate([
        Component({
            selector: 'app-programcontrol',
            templateUrl: './programcontrol.component.html',
            styleUrls: ['./programcontrol.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router])
    ], ProgramControlComponent);
    return ProgramControlComponent;
}());
export { ProgramControlComponent };
//# sourceMappingURL=programcontrol.component.js.map