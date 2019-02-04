var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ApiCommunicationService } from '../api-communication.service';
import { Router } from '@angular/router';
import { CurrentstateFormVO } from '../CurrentStateFormVO';
import { ErrorDisplayComponent } from '../error-display/error-display.component';
var CurrentStateFormComponent = /** @class */ (function () {
    function CurrentStateFormComponent(document, service, router) {
        this.document = document;
        this.service = service;
        this.router = router;
        this.url = "get-application-current-form-data";
        this.startupdata = {};
        console.log(location.pathname);
        var path = location.pathname;
        var name = path.split('/');
        this.splitstring = name[name.length - 1];
        console.log("id:", this.splitstring);
        this.currentstateform = new CurrentstateFormVO();
    }
    CurrentStateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.postDataCFSI(this.url, this.splitstring).subscribe(function (res) {
            res;
            _this.startupdata = res;
            console.log("startupdata", _this.startupdata);
            if (_this.startupdata.application_status == "CSFI") {
                _this.currentstateform = new CurrentstateFormVO();
                _this.currentstateform.program_id = _this.startupdata.program_id;
                _this.currentstateform.startup_registration_id = _this.startupdata.id;
            }
            else {
                _this.router.navigate(['/']);
            }
        }, function (err) {
            alert(err);
        });
    };
    CurrentStateFormComponent.prototype.submitdata = function () {
        var _this = this;
        console.log("values", this.currentstateform);
        var currentstateform = { "current_state_form": this.currentstateform };
        console.log("finaldata", JSON.stringify(currentstateform));
        this.service.submitCurrentStateForm("startup-current-state-form-submission", currentstateform).subscribe(function (res) {
            res;
            if (res) {
                alert("Current State Form Submitted Successfully");
                _this.router.navigate(['/']);
            }
        }, function (err) {
            alert(err);
        });
    };
    __decorate([
        ViewChild(ErrorDisplayComponent),
        __metadata("design:type", Object)
    ], CurrentStateFormComponent.prototype, "errdisplay", void 0);
    CurrentStateFormComponent = __decorate([
        Component({
            selector: 'app-current-state-form',
            templateUrl: './current-state-form.component.html',
            styleUrls: ['./current-state-form.component.css']
        }),
        __param(0, Inject(DOCUMENT)),
        __metadata("design:paramtypes", [Object, ApiCommunicationService, Router])
    ], CurrentStateFormComponent);
    return CurrentStateFormComponent;
}());
export { CurrentStateFormComponent };
//# sourceMappingURL=current-state-form.component.js.map