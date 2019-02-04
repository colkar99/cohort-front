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
var FrameworkModuleEditComponent = /** @class */ (function () {
    function FrameworkModuleEditComponent(apiCom, cookieService, router, route, formBuilder) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.formBuilder = formBuilder;
        this.getUserUrl = 'get-user-details';
        this.framework = {};
        this.activitiesarray = [];
        this.activity = {};
        this.courses1 = [];
        this.arrayids = [];
        this.checklistforms = this.formBuilder.group({
            id: undefined,
            name: '',
            description: '',
            placeholder: '',
            order: '',
            formitems: this.formBuilder.array([])
        });
    }
    FrameworkModuleEditComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    FrameworkModuleEditComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    FrameworkModuleEditComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.framework_id = +this.route.snapshot.paramMap.get('id');
        console.log("frameworkid", this.framework_id);
        if (this.framework_id != (0 && null && undefined)) {
            this.getframework(this.framework_id);
        }
        this.getcourses();
        this.getUserDetails();
    };
    FrameworkModuleEditComponent.prototype.getframework = function (id) {
        var _this = this;
        var url = "program/show-framework";
        var data = { framework: { id: id } };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.framework = data;
        }, function (error) {
            console.log(error);
            alert("the following error has happend");
        });
    };
    FrameworkModuleEditComponent.prototype.getcourses = function () {
        var _this = this;
        var url = "framework/course/view-all";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.courses = data;
            _this.removeduplicates();
        }, function (error) {
            console.log(error);
        });
    };
    FrameworkModuleEditComponent.prototype.getFrameworkActivities = function (id) {
        var _this = this;
        var url = "program/framework/show-activity";
        var data = { framework_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.framework_activity = data;
        }, function (error) {
            console.log(error);
        });
    };
    FrameworkModuleEditComponent.prototype.updateForm = function () {
        var _this = this;
        if (this.framework.id == (null || undefined)) {
            var url = "program/create-framework";
            this.apiCom.postDataWithToken(url, JSON.stringify({ framework: this.framework }), this.authToken).subscribe(function (res) {
                res;
                _this.framework = res;
                _this.errdisplay.openpopup("Success!!!", "FrameWork created Successfully");
            }, function (err) {
                _this.errdisplay.openpopup("Error!!!", err);
            });
        }
        else {
            var url = "program/edit-framework";
            this.apiCom.putDataWithToken(url, JSON.stringify({ framework: this.framework }), this.authToken).subscribe(function (res) {
                res;
                _this.framework = res;
                _this.errdisplay.openpopup("Success!!!", "FrameWork Updated Successfully");
            }, function (err) {
                _this.errdisplay.openpopup("Error!!!", err);
            });
        }
    };
    FrameworkModuleEditComponent.prototype.deleteform = function () {
        var _this = this;
        var url = "program/delete-framework";
        this.apiCom.putDataWithToken(url, JSON.stringify({ framework: { id: this.framework.id } }), this.authToken).subscribe(function (res) {
            res;
            alert("FrameWork Deleted Successfully");
            _this.router.navigate(['admin/dashboard/framework']);
        }, function (err) {
            alert(err);
        });
    };
    FrameworkModuleEditComponent.prototype.createchecklistitems = function () {
        return this.formBuilder.group({
            id: undefined,
            name: '',
            description: ''
        });
    };
    FrameworkModuleEditComponent.prototype.updatechecklistsitems = function (item) {
        return this.formBuilder.group({
            id: item.id,
            name: item.name,
            description: item.description
        });
    };
    FrameworkModuleEditComponent.prototype.addItem = function () {
        this.formitems = this.checklistforms.get('formitems');
        this.formitems.push(this.createchecklistitems());
    };
    FrameworkModuleEditComponent.prototype.deleteItem = function (i) {
        this.btnname = "checklist";
        console.log("id", this.formitems.controls[i].value);
        this.formitems = this.checklistforms.get('formitems');
        this.deleteindex = i;
        this.deletedisplay = "Are you Sure, You want to delete the checklist?";
        var id = this.formitems.controls[i].value.id;
        if (id != (null && undefined)) {
            $("#deletepopup").modal('show');
        }
        else {
            this.formitems.removeAt(i);
        }
        // 
    };
    FrameworkModuleEditComponent.prototype.viewactivities = function (item) {
        console.log(item);
        $("#activitiesmodal").modal('show');
        this.checklistforms.get('name').setValue(item.name);
        this.checklistforms.get('id').setValue(item.id);
        this.checklistforms.get('description').setValue(item.description);
        this.checklistforms.get('order').setValue(item.order);
        this.checklistforms.get('placeholder').setValue(item.placeholder);
        //this.checklistforms.get('formitems').setValue(item.checklists)
        this.checklistforms.setControl('formitems', this.formBuilder.array([]));
        this.formitems = this.checklistforms.get('formitems');
        var controlArray = this.checklistforms.get('formitems');
        // this.formitems = this.checklistforms.get('formitems') as FormArray;
        // for (let i = 0; i < item.checklists.length; i++) {
        //   controlArray.controls[i].get('name').setValue(item.checklists[i].name);
        //   controlArray.controls[i].get('description').setValue(item.checklists[i].description);
        //   controlArray.controls[i].get('id').setValue(item.checklists[i].id);
        // }
        for (var i = 0; i < item.checklists.length; i++) {
            console.log("values", this.updatechecklistsitems(item.checklists[i]));
            this.formitems.push(this.updatechecklistsitems(item.checklists[i]));
        }
        this.formitems = this.checklistforms.get('formitems');
        //item.checklists.forEach(task => { 
        //   this.checklistforms.items.push(
        //     this.formBuilder.group({
        //       name: [task.name],
        //       description:[task.description]
        //     })
        //   );
        // });
    };
    FrameworkModuleEditComponent.prototype.addactivities = function () {
        $("#activitiesmodal").modal('show');
        this.checklistforms = this.formBuilder.group({
            id: undefined,
            name: '',
            description: '',
            placeholder: '',
            order: '',
            formitems: this.formBuilder.array([this.createchecklistitems()])
        });
    };
    FrameworkModuleEditComponent.prototype.saveActivities = function (checklistforms) {
        var _this = this;
        console.log("values", checklistforms);
        var values = checklistforms.value;
        if (values.id == (null || undefined)) {
            var url = "program/framework/create-activity-and-checklists";
            this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, checklists: values.formitems, framework_id: this.framework.id }), this.authToken).subscribe(function (res) {
                res;
                console.log("response", res);
                _this.framework = res;
                alert("Framework Activities and Checklists Saved Successfully");
                $("#activitiesmodal").modal('hide');
            });
        }
        else {
            var url = "program/framework/update-activity-and-checklists";
            this.apiCom.putDataWithToken(url, JSON.stringify({ activity: values, checklists: values.formitems, framework_id: this.framework.id }), this.authToken).subscribe(function (res) {
                res;
                console.log("response", res);
                _this.framework = res;
                alert("Framework Activities and Checklists Updated Successfully");
                $("#activitiesmodal").modal('hide');
            });
        }
    };
    FrameworkModuleEditComponent.prototype.closeactivities = function () {
        $("#activitiesmodal").modal('hide');
    };
    FrameworkModuleEditComponent.prototype.confirmdelete = function () {
        var _this = this;
        if (this.btnname == "checklist") {
            this.formitems = this.checklistforms.get('formitems');
            var id = this.formitems.controls[this.deleteindex].value.id;
            var url = "program/framework/activity/delete-checklist";
            var params = JSON.stringify({ checklist: { id: id } });
            this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                _this.formitems.removeAt(_this.deleteindex);
                $("#deletepopup").modal('hide');
                alert("Checklist Deleted Successfully");
            }, function (error) {
                alert(error);
            });
        }
        else if (this.btnname == "activity") {
            var url = "program/framework/delete-activity";
            var params = JSON.stringify({ activity_id: this.deleteactivityid, framework_id: this.framework.id });
            this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                _this.framework.activities.splice(_this.deleteindex, 1);
                $("#deletepopup").modal('hide');
                alert("Checklist Deleted Successfully");
            }, function (error) {
                alert(error);
            });
        }
    };
    FrameworkModuleEditComponent.prototype.closedelete = function () {
        $("#deletepopup").modal('hide');
    };
    FrameworkModuleEditComponent.prototype.deleteactivities = function (id, i) {
        $("#deletepopup").modal('show');
        this.btnname = "activity";
        this.deletedisplay = "Are you sure, You want to delete this activity and its checklists?";
        this.deleteindex = i;
        this.deleteactivityid = id;
    };
    FrameworkModuleEditComponent.prototype.setvalues = function (checked, value) {
        if (checked == true) {
            this.arrayids.push(value.id);
        }
        else {
            if (checked == false) {
                var deleteindex = this.arrayids.indexOf(value.id);
                console.log(deleteindex);
                if (deleteindex != -1) {
                    this.arrayids.splice(deleteindex, 1);
                    console.log("this.formrequestarray", this.arrayids);
                }
            }
        }
    };
    FrameworkModuleEditComponent.prototype.deletecoursesitems = function (item, i) {
        var _this = this;
        var url = "program/delete-course-with-framework";
        var params = JSON.stringify({ framework_id: this.framework.id, course_id: item.id });
        this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
            res;
            console.log("response", res);
            alert("Framework Course Deleted Successfully");
            _this.getcourses();
            _this.framework.courses.splice(i, 1);
        });
    };
    FrameworkModuleEditComponent.prototype.updateframeworkcourses = function () {
        var _this = this;
        var params;
        if (this.arrayids.length == 0) {
            alert("Select atleast one to update framework courses");
        }
        else {
            params = JSON.stringify({ framework_id: this.framework.id, course_ids: this.arrayids });
            var url = "program/merge-courses-with-framework";
            this.apiCom.postDataWithToken(url, params, this.authToken).subscribe(function (res) {
                res;
                _this.framework = res;
                alert("Framework Courses Updated Successfully");
                if (_this.framework.courses.length > 0) {
                    _this.getcourses();
                    _this.arrayids = [];
                }
                console.log(res);
            });
        }
    };
    FrameworkModuleEditComponent.prototype.removeduplicates = function () {
        var i = this.courses.length;
        while (i--) {
            for (var _i = 0, _a = this.framework.courses; _i < _a.length; _i++) {
                var j = _a[_i];
                if (this.courses[i] && this.courses[i].id == j.id) {
                    // this.courses1.push(this.courses[i])
                    this.courses.splice(i, 1);
                }
            }
        }
    };
    __decorate([
        ViewChild(ErrorDisplayComponent),
        __metadata("design:type", Object)
    ], FrameworkModuleEditComponent.prototype, "errdisplay", void 0);
    FrameworkModuleEditComponent = __decorate([
        Component({
            selector: 'app-sitedashboard-framework-module-edit',
            templateUrl: './framework-edit.component.html',
            styleUrls: ['./framework-edit.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService,
            CookieService,
            Router,
            ActivatedRoute,
            FormBuilder])
    ], FrameworkModuleEditComponent);
    return FrameworkModuleEditComponent;
}());
export { FrameworkModuleEditComponent };
//# sourceMappingURL=framework-edit.component.js.map