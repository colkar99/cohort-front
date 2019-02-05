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
import { FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
var CreateProgramComponent = /** @class */ (function () {
    function CreateProgramComponent(cookieService, formBuilder, apiService, router) {
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.router = router;
        this.program = [];
        this.application_questions_ids = [];
        this.showForm = false;
        this.datas = [];
        this.reviewAndSubmit = { application_questions: [] };
        this.submitted = false;
        this.showReviewAndSubmit = false;
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
        this.getProgramModuleDatas();
    }
    CreateProgramComponent.prototype.ngOnInit = function () { };
    CreateProgramComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    CreateProgramComponent.prototype.initProgramForm = function (controls) {
        this.program = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            start_date: ['', Validators.required],
            end_date: ['', Validators.required],
            seat_size: [null, Validators.required],
            industry: ['', Validators.required],
            main_image: [''],
            logo_image: [''],
            duration: ['', Validators.required],
            application_start_date: ['', Validators.required],
            application_end_date: ['', Validators.required],
            ProgramLocation_id: [null, Validators.required],
            program_type_id: [null, Validators.required],
            framework_id: [null, Validators.required],
            program_admin: [null, Validators.required],
            program_director: [null, Validators.required],
            application_manager: [null, Validators.required],
            contract_manager: [null, Validators.required],
            application_questions: new FormArray(controls)
        });
        this.showForm = true;
        this.hideArrayControl = true;
    };
    ;
    CreateProgramComponent.prototype.getProgramModuleDatas = function () {
        var _this = this;
        this.apiService.getDataWithAuth("get-program-module", this.auth)
            .subscribe(function (data) {
            _this.datas = data;
            var controls = data.application_questions.map(function (c) { return new FormControl(false); });
            controls[0].setValue(true); // Set the first checkbox to true (checked)
            console.log(_this.datas);
            _this.initProgramForm(controls);
        }, function (error) {
            console.error("couldn't post because", error);
        });
    };
    CreateProgramComponent.prototype.onProgramSubmit = function (program, datas) {
        this.submitted = true;
        var program_types;
        this.reviewAndSubmit["application_questions"] = [];
        this.application_questions_ids = this.program.value.application_questions
            .map(function (v, i) { return v ? datas.application_questions[i].id : null; })
            .filter(function (v) { return v !== null; });
        console.log(this.application_questions_ids);
        if (program.valid) {
            for (var _i = 0, _a = datas.program_types; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.id == program.value.program_type_id) {
                    this.reviewAndSubmit["program_type"] = item;
                }
            }
            for (var _b = 0, _c = datas.program_locations; _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.id == program.value.ProgramLocation_id) {
                    this.reviewAndSubmit["program_location"] = item;
                }
            }
            for (var _d = 0, _e = datas.frameworks; _d < _e.length; _d++) {
                var item = _e[_d];
                if (item.id == program.value.framework_id) {
                    this.reviewAndSubmit["framework"] = item;
                }
            }
            for (var _f = 0, _g = datas.users.program_admin; _f < _g.length; _f++) {
                var item = _g[_f];
                if (item.id == program.value.program_admin) {
                    this.reviewAndSubmit["program_admin"] = item;
                }
            }
            for (var _h = 0, _j = datas.users.program_director; _h < _j.length; _h++) {
                var item = _j[_h];
                if (item.id == program.value.program_director) {
                    this.reviewAndSubmit["program_director"] = item;
                }
            }
            for (var _k = 0, _l = datas.users.application_manager; _k < _l.length; _k++) {
                var item = _l[_k];
                if (item.id == program.value.application_manager) {
                    this.reviewAndSubmit["application_manager"] = item;
                }
            }
            for (var _m = 0, _o = datas.users.contract_manager; _m < _o.length; _m++) {
                var item = _o[_m];
                if (item.id == program.value.contract_manager) {
                    this.reviewAndSubmit['contract_manager'] = item;
                }
                this.showReviewAndSubmit = true;
            }
            for (var _p = 0, _q = datas.application_questions; _p < _q.length; _p++) {
                var item = _q[_p];
                for (var _r = 0, _s = this.application_questions_ids; _r < _s.length; _r++) {
                    var item2 = _s[_r];
                    if (item.id == item2) {
                        this.reviewAndSubmit["application_questions"].push(item);
                    }
                }
            }
            this.reviewAndSubmit['program_details'] = program.value;
            $('#reviewAndSubmitModel').modal('show');
        }
        console.log(this.reviewAndSubmit);
    };
    ;
    CreateProgramComponent.prototype.onSubmitProgramForms = function () {
        var _this = this;
        this.program.removeControl('application_questions');
        this.hideArrayControl = false;
        var data = { "program": this.program.value, "application_questions": this.reviewAndSubmit.application_questions };
        this.apiService.postDataWithToken("create-program", JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            $('#reviewAndSubmitModel').modal('hide');
            _this.router.navigate(['/admin/dashboard/program']);
        }, function (error) {
            console.log("errors: " + error);
        });
    };
    CreateProgramComponent = __decorate([
        Component({
            selector: 'app-createprogram',
            templateUrl: './createprogram.component.html',
            styleUrls: ['./createprogram.component.css']
        }),
        __metadata("design:paramtypes", [CookieService,
            FormBuilder,
            ApiCommunicationService,
            Router])
    ], CreateProgramComponent);
    return CreateProgramComponent;
}());
export { CreateProgramComponent };
//# sourceMappingURL=createprogram.component.js.map