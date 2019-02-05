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
import { FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ErrorDisplayComponent } from '../../../error-display/error-display.component';
import { SharedDataService } from '../../../shared-data.service';
var CourseEditComponent = /** @class */ (function () {
    function CourseEditComponent(apiCom, cookieService, router, route, sharedservice, formBuilder) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.sharedservice = sharedservice;
        this.formBuilder = formBuilder;
        this.getUserUrl = 'get-user-details';
        this.course = {};
        this.activitiesarray = [];
        this.activity = {};
        this.checklistforms = this.formBuilder.group({
            id: undefined,
            name: '',
            description: '',
            placeholder: '',
            order: '',
            checklists: this.formBuilder.array([])
        });
    }
    CourseEditComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    CourseEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.course_id = +this.route.snapshot.paramMap.get('id');
        console.log("course_id", this.course_id);
        if (this.course_id != (0 && null && undefined)) {
            this.sharedservice.currentMessage.subscribe(function (message) { return _this.course = message; });
            // this.getcourses(this.course_id)
            // this.getcoursesActivities(this.course_id);
        }
        this.getUserDetails();
    };
    CourseEditComponent.prototype.getcourses = function (id) {
        var _this = this;
        var url = "framework/show-course";
        var data = { course: { id: id } };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.course = data;
        }, function (error) {
            console.log(error);
            alert("the following error has happend");
        });
    };
    CourseEditComponent.prototype.getAllActivities = function () {
        var _this = this;
        var url = "framework/course/show-all-activities";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.allActivity = data;
        }, function (error) {
            console.log(error);
        });
    };
    CourseEditComponent.prototype.getcoursesActivities = function (id) {
        var _this = this;
        var url = "framework/course/show-activity";
        var data = { course: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.framework_activity = data;
        }, function (error) {
            console.log(error);
        });
    };
    CourseEditComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    CourseEditComponent.prototype.deleteform = function () {
        var _this = this;
        var url = "framework/course/delete-course-activity-and-checklists";
        var params = { "course_id": this.course.id };
        this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
            res;
            alert("Courses Deleted Successfully");
            _this.router.navigate(['admin/dashboard/framework']);
        });
    };
    CourseEditComponent.prototype.updateForm = function () {
        var _this = this;
        var url = "framework/course/create-and-update-course";
        this.apiCom.postDataWithToken(url, JSON.stringify({ course: this.course }), this.authToken).subscribe(function (res) {
            res;
            _this.course = res;
            _this.errdisplay.openpopup("Success!!!", "Course created Successfully");
        }, function (err) {
            _this.errdisplay.openpopup("Error!!!", err);
        });
    };
    CourseEditComponent.prototype.createchecklistitems = function () {
        return this.formBuilder.group({
            id: undefined,
            name: '',
            description: ''
        });
    };
    CourseEditComponent.prototype.updatechecklistsitems = function (item) {
        return this.formBuilder.group({
            id: item.id,
            name: item.name,
            description: item.description
        });
    };
    CourseEditComponent.prototype.addItem = function () {
        this.checklists = this.checklistforms.get('checklists');
        this.checklists.push(this.createchecklistitems());
    };
    CourseEditComponent.prototype.deleteItem = function (i) {
        this.btnname = "checklist";
        console.log("id", this.checklists.controls[i].value);
        this.checklists = this.checklistforms.get('checklists');
        this.deleteindex = i;
        this.deletedisplay = "Are you Sure, You want to delete the checklist?";
        var id = this.checklists.controls[i].value.id;
        if (id != (null && undefined)) {
            $("#deletepopup").modal('show');
        }
        else {
            this.checklists.removeAt(i);
        }
        // 
    };
    CourseEditComponent.prototype.viewactivities = function (item) {
        console.log(item);
        $("#activitiesmodal").modal('show');
        this.checklistforms.get('name').setValue(item.name);
        this.checklistforms.get('id').setValue(item.id);
        this.checklistforms.get('description').setValue(item.description);
        this.checklistforms.get('order').setValue(item.order);
        this.checklistforms.get('placeholder').setValue(item.placeholder);
        //this.checklistforms.get('formitems').setValue(item.checklists)
        this.checklistforms.setControl('checklists', this.formBuilder.array([]));
        this.checklists = this.checklistforms.get('checklists');
        var controlArray = this.checklistforms.get('formitems');
        // this.formitems = this.checklistforms.get('formitems') as FormArray;
        // for (let i = 0; i < item.checklists.length; i++) {
        //   controlArray.controls[i].get('name').setValue(item.checklists[i].name);
        //   controlArray.controls[i].get('description').setValue(item.checklists[i].description);
        //   controlArray.controls[i].get('id').setValue(item.checklists[i].id);
        // }
        for (var i = 0; i < item.checklists.length; i++) {
            console.log("values", this.updatechecklistsitems(item.checklists[i]));
            this.checklists.push(this.updatechecklistsitems(item.checklists[i]));
        }
        this.checklists = this.checklistforms.get('checklists');
        //item.checklists.forEach(task => { 
        //   this.checklistforms.items.push(
        //     this.formBuilder.group({
        //       name: [task.name],
        //       description:[task.description]
        //     })
        //   );
        // });
    };
    CourseEditComponent.prototype.addactivities = function () {
        $("#activitiesmodal").modal('show');
        this.checklistforms = this.formBuilder.group({
            id: undefined,
            name: '',
            description: '',
            placeholder: '',
            order: '',
            checklists: this.formBuilder.array([this.createchecklistitems()])
        });
    };
    CourseEditComponent.prototype.saveActivities = function (checklistforms) {
        var _this = this;
        console.log("values", checklistforms);
        var values = checklistforms.value;
        for (var i = 0; i < values.checklists.length; i++) {
            if (values.checklists[i].id == (null || undefined)) {
                delete values.checklists[i].id;
            }
        }
        if (values.id == (null || undefined)) {
            var url = "framework/course/create-activity-and-checklists";
            this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, course_id: this.course.id }), this.authToken).subscribe(function (res) {
                res;
                console.log("response", res);
                _this.course = res;
                alert("Course Activities and Checklists Saved Successfully");
                $("#activitiesmodal").modal('hide');
            });
        }
        else {
            var url = "framework/course/create-activity-and-checklists";
            this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, course_id: this.course.id }), this.authToken).subscribe(function (res) {
                res;
                console.log("response", res);
                _this.course = res;
                alert("Course Activities and Checklists Updated Successfully");
                $("#activitiesmodal").modal('hide');
            });
        }
    };
    CourseEditComponent.prototype.closeactivities = function () {
        $("#activitiesmodal").modal('hide');
    };
    CourseEditComponent.prototype.confirmdelete = function () {
        var _this = this;
        if (this.btnname == "checklist") {
            this.checklists = this.checklistforms.get('checklists');
            var id = this.checklists.controls[this.deleteindex].value.id;
            var url = "program/framework/activity/delete-checklist";
            var params = JSON.stringify({ checklist: { id: id } });
            this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                _this.checklists.removeAt(_this.deleteindex);
                $("#deletepopup").modal('hide');
                alert("Checklist Deleted Successfully");
            }, function (error) {
                alert(error);
            });
        }
        else if (this.btnname == "activity") {
            var url = "framework/course/delete-activity-and-checklists";
            var params = JSON.stringify({ activity_id: this.deleteactivityid, course_id: this.course.id });
            this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                _this.course.activities.splice(_this.deleteindex, 1);
                $("#deletepopup").modal('hide');
                alert("Checklist Deleted Successfully");
            }, function (error) {
                alert(error);
            });
        }
    };
    CourseEditComponent.prototype.closedelete = function () {
        $("#deletepopup").modal('hide');
    };
    CourseEditComponent.prototype.deleteactivities = function (id, i) {
        $("#deletepopup").modal('show');
        this.btnname = "activity";
        this.deletedisplay = "Are you sure, You want to delete this activity and its checklists?";
        this.deleteindex = i;
        this.deleteactivityid = id;
    };
    __decorate([
        ViewChild(ErrorDisplayComponent),
        __metadata("design:type", Object)
    ], CourseEditComponent.prototype, "errdisplay", void 0);
    CourseEditComponent = __decorate([
        Component({
            selector: 'app-course-edit',
            templateUrl: './course-edit.component.html',
            styleUrls: ['./course-edit.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute,
            SharedDataService,
            FormBuilder])
    ], CourseEditComponent);
    return CourseEditComponent;
}());
export { CourseEditComponent };
//# sourceMappingURL=course-edit.component.js.map