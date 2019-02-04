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
var ErrorDisplayComponent = /** @class */ (function () {
    function ErrorDisplayComponent() {
    }
    ErrorDisplayComponent.prototype.ngOnInit = function () {
    };
    ErrorDisplayComponent.prototype.openpopup = function (header, err) {
        this.error = err;
        this.Header = header;
        $("#errmodal").modal({
            backdrop: "static",
            keyboard: false
        }, "show");
    };
    ErrorDisplayComponent.prototype.closepopup = function () {
        $("#errmodal").modal('hide');
    };
    ErrorDisplayComponent = __decorate([
        Component({
            selector: 'app-error-display',
            templateUrl: './error-display.component.html',
            styleUrls: ['./error-display.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ErrorDisplayComponent);
    return ErrorDisplayComponent;
}());
export { ErrorDisplayComponent };
//# sourceMappingURL=error-display.component.js.map