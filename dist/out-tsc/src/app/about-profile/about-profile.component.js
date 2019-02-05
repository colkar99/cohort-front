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
var AboutProfileComponent = /** @class */ (function () {
    function AboutProfileComponent() {
        this.companylogo = "assets/photo.png";
        this.CompanyName = "PETRAS";
        this.Mentors = "Stanly,Selwyn";
        this.bio = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns). Three Equal Columns Using Numbers. You can also use numbers to control the column width.";
        this.currentstate = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns)";
    }
    AboutProfileComponent.prototype.ngOnInit = function () {
    };
    AboutProfileComponent = __decorate([
        Component({
            selector: 'app-about-profile',
            templateUrl: './about-profile.component.html',
            styleUrls: ['./about-profile.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], AboutProfileComponent);
    return AboutProfileComponent;
}());
export { AboutProfileComponent };
//# sourceMappingURL=about-profile.component.js.map