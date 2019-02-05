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
import { ApiCommunicationService } from '../api-communication.service';
var ProgramsComponent = /** @class */ (function () {
    function ProgramsComponent(apiService) {
        this.apiService = apiService;
        this.allPrograms = [];
        this.livePrograms = [];
    }
    ProgramsComponent.prototype.ngOnInit = function () {
        this.getAllProgram();
    };
    ProgramsComponent.prototype.getAllProgram = function () {
        var _this = this;
        this.apiService.getDataWithoutAuth('get-list-of-programs')
            .subscribe(function (data) {
            _this.allPrograms = data;
            _this.livePrograms = data.all_programs.live;
            _this.expPrograms = data.all_programs.exp;
            debugger;
            console.log("All programs: " + _this.allPrograms);
            console.log("live programs: " + data.all_programs.live);
            console.log("exp programs: " + data.all_programs.exp);
        }, function (error) {
            console.log("The following error has been occured: " + error);
        });
    };
    ProgramsComponent = __decorate([
        Component({
            selector: 'app-programs',
            templateUrl: './programs.component.html',
            styleUrls: ['./programs.component.css']
        }),
        __metadata("design:paramtypes", [ApiCommunicationService])
    ], ProgramsComponent);
    return ProgramsComponent;
}());
export { ProgramsComponent };
//# sourceMappingURL=programs.component.js.map