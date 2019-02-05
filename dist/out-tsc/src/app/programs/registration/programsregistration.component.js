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
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
var ProgramsRegistrationComponent = /** @class */ (function () {
    function ProgramsRegistrationComponent(apiService, route, fb, router) {
        this.apiService = apiService;
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.formSubmitted = false;
        this.program_id = +this.route.snapshot.paramMap.get('id');
        this.application_questions_form = this.fb.group({
            application_question: new FormArray([])
        });
    }
    ProgramsRegistrationComponent.prototype.ngOnInit = function () {
        // this.getAllProgram();
        this.getApplicationQuestion();
    };
    ProgramsRegistrationComponent.prototype.initAppQuesSubmit = function (form) {
        var _this = this;
        var dum_data = form.value;
        var data = { application_ques_response: dum_data, program_id: this.program_id, startup_application_id: this.startup_application.id };
        this.apiService.postData('create-program-questions-response', JSON.stringify(data))
            .subscribe(function (data) {
            debugger;
            console.log(data);
            _this.router.navigate(['/']);
        }, function (error) {
            debugger;
            console.log(data);
        });
        // dum_data.application_question.forEach(element => {
        //   let data = {application_ques_response: element, program_id: this.program_id,startup_application_id: this.startup_application.id };
        //     this.apiService.postData('create-program-questions-response',JSON.stringify(data))
        //     .subscribe(data =>{
        //       console.log(data);
        //     },error =>{
        //       console.log(data)
        //       })
        // });
    };
    ProgramsRegistrationComponent.prototype.handleFormSubmit = function (form) {
        var _this = this;
        var data = { program_registration: form.value };
        data.program_registration.program_id = this.program_id;
        this.apiService.postData('program/startup-registration', JSON.stringify(data))
            .subscribe(function (data) {
            console.log(data);
            _this.startup_application = data;
            _this.formSubmitted = true;
        }, function (error) {
            console.log(error);
        });
    };
    ProgramsRegistrationComponent.prototype.createQuesResponse = function (element) {
        return this.fb.group({
            application_question_id: element.id,
            response: ''
        });
    };
    ProgramsRegistrationComponent.prototype.getApplicationQuestion = function () {
        var _this = this;
        var data = { program_id: this.program_id };
        this.apiService.postData('show-program-questions', JSON.stringify(data))
            .subscribe(function (data) {
            console.log(data);
            _this.application_questions = data;
            _this.application_questions.forEach(function (element) {
                _this.app_ques = _this.application_questions_form.get('application_question');
                _this.app_ques.push(_this.createQuesResponse(element));
            });
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ProgramsRegistrationComponent = __decorate([
        Component({
            selector: 'app-programsregistration',
            templateUrl: './programsregistration.component.html',
            styleUrls: ['./programsregistration.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            ActivatedRoute,
            FormBuilder,
            Router])
    ], ProgramsRegistrationComponent);
    return ProgramsRegistrationComponent;
}());
export { ProgramsRegistrationComponent };
//# sourceMappingURL=programsregistration.component.js.map