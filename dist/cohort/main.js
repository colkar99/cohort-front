(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api-communication.service.ts":
/*!**********************************************!*\
  !*** ./src/app/api-communication.service.ts ***!
  \**********************************************/
/*! exports provided: ApiCommunicationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiCommunicationService", function() { return ApiCommunicationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ApiCommunicationService = /** @class */ (function () {
    function ApiCommunicationService(http) {
        this.http = http;
        this.url = "http://localhost:3000/v1/";
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        this._headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
    }
    ApiCommunicationService.prototype.postData = function (url, params) {
        this.domainUrl = "" + this.url + url;
        return this.http.post(this.domainUrl, params, this.httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.postDataWithToken = function (url, params, auth) {
        this.domainUrl = "" + this.url + url;
        var headers = this._headers.append('Authorization', auth);
        debugger;
        return this.http.post(this.domainUrl, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.putDataWithToken = function (url, params, auth) {
        this.domainUrl = "" + this.url + url;
        var headers = this._headers.append('Authorization', auth);
        debugger;
        return this.http.put(this.domainUrl, params, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.getDataWithAuth = function (url, auth) {
        this.domainUrl = "" + this.url + url;
        // this.httpOptions.headers.append('Authorization', 'asdasdasd');
        var headers = this._headers.append('Authorization', auth);
        return this.http.get(this.domainUrl, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.getDataWithoutAuth = function (url) {
        this.domainUrl = "" + this.url + url;
        return this.http.get(this.domainUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ;
    // getDate(url){
    //   this.domainUrl = `${this.url}${url}`;
    //   return this.http.get<any>(this.domainUrl)
    //   .pipe(
    //     catchError(this.handleError)
    //   );
    // }
    ApiCommunicationService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error occured:", error.error.message);
        }
        else {
            console.error("Backend returned error:" + error.status + ("body was:" + error));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])('Something happened please try agin later');
    };
    ApiCommunicationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiCommunicationService);
    return ApiCommunicationService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _mentordashboard_mentordashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mentordashboard/mentordashboard.component */ "./src/app/mentordashboard/mentordashboard.component.ts");
/* harmony import */ var _sitedashboard_sitedashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sitedashboard/sitedashboard.component */ "./src/app/sitedashboard/sitedashboard.component.ts");
/* harmony import */ var _startupdashboard_startupdashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./startupdashboard/startupdashboard.component */ "./src/app/startupdashboard/startupdashboard.component.ts");
/* harmony import */ var _sitedashboard_usermodule_usermodule_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sitedashboard/usermodule/usermodule.component */ "./src/app/sitedashboard/usermodule/usermodule.component.ts");
/* harmony import */ var _sitedashboard_usercontroller_usercontroller_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./sitedashboard/usercontroller/usercontroller.component */ "./src/app/sitedashboard/usercontroller/usercontroller.component.ts");
/* harmony import */ var _sitedashboard_programmodule_programmodule_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sitedashboard/programmodule/programmodule.component */ "./src/app/sitedashboard/programmodule/programmodule.component.ts");
/* harmony import */ var _sitedashboard_programmodule_createprogram_createprogram_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sitedashboard/programmodule/createprogram/createprogram.component */ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.ts");
/* harmony import */ var _programs_programs_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./programs/programs.component */ "./src/app/programs/programs.component.ts");
/* harmony import */ var _programs_registration_programsregistration_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./programs/registration/programsregistration.component */ "./src/app/programs/registration/programsregistration.component.ts");
/* harmony import */ var _sitedashboard_programcontrol_programcontrol_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sitedashboard/programcontrol/programcontrol.component */ "./src/app/sitedashboard/programcontrol/programcontrol.component.ts");
/* harmony import */ var _sitedashboard_programcontrol_startupcontrol_startupcontrol_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sitedashboard/programcontrol/startupcontrol/startupcontrol.component */ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.ts");
/* harmony import */ var _sitedashboard_contractmanagercontrol_contractmanager_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sitedashboard/contractmanagercontrol/contractmanager.component */ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.ts");
/* harmony import */ var _sitedashboard_contractmanagercontrol_contractform_contractform_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sitedashboard/contractmanagercontrol/contractform/contractform.component */ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'admin/dashboard', component: _sitedashboard_sitedashboard_component__WEBPACK_IMPORTED_MODULE_4__["SitedashboardComponent"], pathMatch: 'prefix',
        children: [{ path: 'user', component: _sitedashboard_usermodule_usermodule_component__WEBPACK_IMPORTED_MODULE_6__["UsermoduleComponent"] },
            { path: 'user/controller/:id', component: _sitedashboard_usercontroller_usercontroller_component__WEBPACK_IMPORTED_MODULE_7__["UsercontrollerComponent"] },
            { path: 'program', component: _sitedashboard_programmodule_programmodule_component__WEBPACK_IMPORTED_MODULE_8__["ProgramModuleComponent"] },
            { path: 'program/create-program', component: _sitedashboard_programmodule_createprogram_createprogram_component__WEBPACK_IMPORTED_MODULE_9__["CreateProgramComponent"] },
            { path: 'program-controls', component: _sitedashboard_programcontrol_programcontrol_component__WEBPACK_IMPORTED_MODULE_12__["ProgramControlComponent"] },
            { path: 'program-controls/startup/:id', component: _sitedashboard_programcontrol_startupcontrol_startupcontrol_component__WEBPACK_IMPORTED_MODULE_13__["StartupControlComponent"] }
        ] },
    { path: 'startup/dashboard', component: _startupdashboard_startupdashboard_component__WEBPACK_IMPORTED_MODULE_5__["StartupdashboardComponent"] },
    { path: 'mentor/dashboard', component: _mentordashboard_mentordashboard_component__WEBPACK_IMPORTED_MODULE_3__["MentordashboardComponent"] },
    { path: 'live-programs', component: _programs_programs_component__WEBPACK_IMPORTED_MODULE_10__["ProgramsComponent"] },
    { path: 'live-programs/registration/:id', component: _programs_registration_programsregistration_component__WEBPACK_IMPORTED_MODULE_11__["ProgramsRegistrationComponent"] },
    { path: 'dashboard/contract-manager', component: _sitedashboard_contractmanagercontrol_contractmanager_component__WEBPACK_IMPORTED_MODULE_14__["ContractManagerComponent"] },
    { path: 'dashboard/contract-manager/:id', component: _sitedashboard_contractmanagercontrol_contractform_contractform_component__WEBPACK_IMPORTED_MODULE_15__["ContractFormComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Sticky footer styles\n-------------------------------------------------- */\nhtml {\n    position: relative;\n    min-height: 100%;\n  }\nbody {\n    /* Margin bottom by footer height */\n    margin-bottom: 60px;\n  }\n.footer {\n    /* position: absolute; */\n    bottom: 0;\n    width: 100%;\n    /* Set the fixed height of the footer here */\n    height: 60px;\n    background-color: #f5f5f5;\n  }\n/* Custom page CSS\n  -------------------------------------------------- */\n/* Not required for template or sticky footer method. */\nbody > .container {\n    padding: 60px 15px 0;\n  }\n.container .text-muted {\n    margin: 20px 0;\n  }\n.footer > .container {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\ncode {\n    font-size: 80%;\n  }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7cURBQ3FEO0FBQ3JEO0lBQ0ksbUJBQW1CO0lBQ25CLGlCQUFpQjtHQUNsQjtBQUNEO0lBQ0Usb0NBQW9DO0lBQ3BDLG9CQUFvQjtHQUNyQjtBQUNEO0lBQ0UseUJBQXlCO0lBQ3pCLFVBQVU7SUFDVixZQUFZO0lBQ1osNkNBQTZDO0lBQzdDLGFBQWE7SUFDYiwwQkFBMEI7R0FDM0I7QUFHRDt1REFDcUQ7QUFDckQsd0RBQXdEO0FBRXhEO0lBQ0UscUJBQXFCO0dBQ3RCO0FBQ0Q7SUFDRSxlQUFlO0dBQ2hCO0FBRUQ7SUFDRSxvQkFBb0I7SUFDcEIsbUJBQW1CO0dBQ3BCO0FBRUQ7SUFDRSxlQUFlO0dBQ2hCIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTdGlja3kgZm9vdGVyIHN0eWxlc1xuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmh0bWwge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xuICB9XG4gIGJvZHkge1xuICAgIC8qIE1hcmdpbiBib3R0b20gYnkgZm9vdGVyIGhlaWdodCAqL1xuICAgIG1hcmdpbi1ib3R0b206IDYwcHg7XG4gIH1cbiAgLmZvb3RlciB7XG4gICAgLyogcG9zaXRpb246IGFic29sdXRlOyAqL1xuICAgIGJvdHRvbTogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICAvKiBTZXQgdGhlIGZpeGVkIGhlaWdodCBvZiB0aGUgZm9vdGVyIGhlcmUgKi9cbiAgICBoZWlnaHQ6IDYwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbiAgfVxuICBcbiAgXG4gIC8qIEN1c3RvbSBwYWdlIENTU1xuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiBOb3QgcmVxdWlyZWQgZm9yIHRlbXBsYXRlIG9yIHN0aWNreSBmb290ZXIgbWV0aG9kLiAqL1xuICBcbiAgYm9keSA+IC5jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDYwcHggMTVweCAwO1xuICB9XG4gIC5jb250YWluZXIgLnRleHQtbXV0ZWQge1xuICAgIG1hcmdpbjogMjBweCAwO1xuICB9XG4gIFxuICAuZm9vdGVyID4gLmNvbnRhaW5lciB7XG4gICAgcGFkZGluZy1yaWdodDogMTVweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDE1cHg7XG4gIH1cbiAgXG4gIGNvZGUge1xuICAgIGZvbnQtc2l6ZTogODAlO1xuICB9XG4gICJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <!-- Fixed navbar -->\n    <nav class=\"navbar navbar-inverse navbar-fixed-top\">\n      <div class=\"container\">\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\">Project name</a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n          <ul class=\"nav navbar-nav navbar-right\">\n            <li><a routerLink=\"/live-programs\">Programs</a></li>\n            <li *ngIf=\"!this.loggedIn\"><a routerLink=\"/login\">Login</a></li>\n            <li *ngIf=\"!this.loggedIn\"><a href=\"#\">Register</a></li>\n            <li *ngIf=\"this.loggedIn\" (click)=\"logout()\"><a>Logout</a></li>\n            <!-- <li class=\"dropdown\">\n              <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n              <ul class=\"dropdown-menu\">\n                <li><a href=\"#\">Action</a></li>\n                <li><a href=\"#\">Another action</a></li>\n                <li><a href=\"#\">Something else here</a></li>\n                <li role=\"separator\" class=\"divider\"></li>\n                <li class=\"dropdown-header\">Nav header</li>\n                <li><a href=\"#\">Separated link</a></li>\n                <li><a href=\"#\">One more separated link</a></li>\n              </ul>\n            </li> -->\n          </ul>\n        </div><!--/.nav-collapse -->\n      </div>\n    </nav>\n    <section>\n          <!-- Begin page content -->\n      <div class=\"container\">\n        <router-outlet></router-outlet>\n      </div>\n    </section>\n\n    <footer class=\"footer\">\n      <div class=\"container\">\n        <p class=\"text-muted\">Place sticky footer content here.</p>\n      </div>\n    </footer>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared-data.service */ "./src/app/shared-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(cookieService, router, sharedData) {
        this.cookieService = cookieService;
        this.router = router;
        this.sharedData = sharedData;
        this.title = 'cohort';
        // this.detect.detectChanges();
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.cookieService.set( 'appCookie', 'This is hello apps.' );
        this.sharedData.currentMessage.subscribe(function (message) {
            _this.message = message;
            _this.loggedIn = true;
        });
        this.checkStatus = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        if (this.checkStatus.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
        // console.log(this.testCock);
    };
    AppComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    AppComponent.prototype.deleteCookie = function (key) {
        debugger;
        return this.cookieService.deleteAll('/');
    };
    AppComponent.prototype.logout = function () {
        this.deleteCookie('Authorization');
        this.deleteCookie('role');
        this.loggedIn = false;
        // this.detect.detectChanges();
        this.router.navigate(['/']);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_1__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_data_service__WEBPACK_IMPORTED_MODULE_3__["SharedDataService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _sitedashboard_sitedashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sitedashboard/sitedashboard.component */ "./src/app/sitedashboard/sitedashboard.component.ts");
/* harmony import */ var _sitedashboard_usermodule_usermodule_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sitedashboard/usermodule/usermodule.component */ "./src/app/sitedashboard/usermodule/usermodule.component.ts");
/* harmony import */ var _sitedashboard_usercontroller_usercontroller_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sitedashboard/usercontroller/usercontroller.component */ "./src/app/sitedashboard/usercontroller/usercontroller.component.ts");
/* harmony import */ var _startupdashboard_startupdashboard_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./startupdashboard/startupdashboard.component */ "./src/app/startupdashboard/startupdashboard.component.ts");
/* harmony import */ var _mentordashboard_mentordashboard_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mentordashboard/mentordashboard.component */ "./src/app/mentordashboard/mentordashboard.component.ts");
/* harmony import */ var _sitedashboard_programmodule_programmodule_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./sitedashboard/programmodule/programmodule.component */ "./src/app/sitedashboard/programmodule/programmodule.component.ts");
/* harmony import */ var _sitedashboard_programmodule_createprogram_createprogram_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./sitedashboard/programmodule/createprogram/createprogram.component */ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.ts");
/* harmony import */ var _programs_programs_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./programs/programs.component */ "./src/app/programs/programs.component.ts");
/* harmony import */ var _programs_registration_programsregistration_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./programs/registration/programsregistration.component */ "./src/app/programs/registration/programsregistration.component.ts");
/* harmony import */ var _sitedashboard_programcontrol_programcontrol_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./sitedashboard/programcontrol/programcontrol.component */ "./src/app/sitedashboard/programcontrol/programcontrol.component.ts");
/* harmony import */ var _sitedashboard_programcontrol_startupcontrol_startupcontrol_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./sitedashboard/programcontrol/startupcontrol/startupcontrol.component */ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.ts");
/* harmony import */ var _sitedashboard_contractmanagercontrol_contractmanager_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./sitedashboard/contractmanagercontrol/contractmanager.component */ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.ts");
/* harmony import */ var _sitedashboard_contractmanagercontrol_contractform_contractform_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./sitedashboard/contractmanagercontrol/contractform/contractform.component */ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_7__["LoginComponent"],
                _sitedashboard_sitedashboard_component__WEBPACK_IMPORTED_MODULE_8__["SitedashboardComponent"],
                _startupdashboard_startupdashboard_component__WEBPACK_IMPORTED_MODULE_11__["StartupdashboardComponent"],
                _mentordashboard_mentordashboard_component__WEBPACK_IMPORTED_MODULE_12__["MentordashboardComponent"],
                _sitedashboard_usermodule_usermodule_component__WEBPACK_IMPORTED_MODULE_9__["UsermoduleComponent"],
                _sitedashboard_usercontroller_usercontroller_component__WEBPACK_IMPORTED_MODULE_10__["UsercontrollerComponent"],
                _sitedashboard_programmodule_programmodule_component__WEBPACK_IMPORTED_MODULE_13__["ProgramModuleComponent"],
                _sitedashboard_programmodule_createprogram_createprogram_component__WEBPACK_IMPORTED_MODULE_14__["CreateProgramComponent"],
                _programs_programs_component__WEBPACK_IMPORTED_MODULE_15__["ProgramsComponent"],
                _programs_registration_programsregistration_component__WEBPACK_IMPORTED_MODULE_16__["ProgramsRegistrationComponent"],
                _sitedashboard_programcontrol_programcontrol_component__WEBPACK_IMPORTED_MODULE_17__["ProgramControlComponent"],
                _sitedashboard_programcontrol_startupcontrol_startupcontrol_component__WEBPACK_IMPORTED_MODULE_18__["StartupControlComponent"],
                _sitedashboard_contractmanagercontrol_contractmanager_component__WEBPACK_IMPORTED_MODULE_19__["ContractManagerComponent"],
                _sitedashboard_contractmanagercontrol_contractform_contractform_component__WEBPACK_IMPORTED_MODULE_20__["ContractFormComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
            ],
            providers: [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_6__["CookieService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7Q0FDbEIiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mar-top\">\n  <h2>Login Form</h2>\n  <form class=\"form-group\" [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n    <div class=\"col-md-12\">\n      <label>Email:</label>\n      <input type=\"email\" class=\"form-control\" formControlName=\"email\" required/>\n    </div>\n    <div class=\"col-md-12\">\n      <label>Password:</label>\n      <input type=\"password\" class=\"form-control\" formControlName=\"password\" required/>\n    </div>\n    <div class=\"col-md-12\">\n      <button type=\"submit\" [disabled]= \"!loginForm.valid\" class=\"btn btn-primary\">Submit</button>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared-data.service */ "./src/app/shared-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(apiCom, cookieService, router, sharedData) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.sharedData = sharedData;
        this.loginUrl = "authenticate";
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('')
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.warn(this.loginForm.value);
        this.apiCom.postData(this.loginUrl, JSON.stringify(this.loginForm.value))
            .subscribe(function (data) {
            console.log("success!", data);
            _this.cookieService.set('Authorization', data.auth_token, 30, '/');
            _this.cookieService.set('user_id', data.user_id, 30, '/');
            _this.cookieService.set('user_type', data.user_type, 30, '/');
            _this.cookieService.set('role', data.roles[0].name, 30, '/');
            _this.newMessage();
            if (data.user_type == "site") {
                // this.router.navigate(['admin/dashboard']);
                if (data.roles[0].name == "site_admin")
                    _this.router.navigate(['admin/dashboard']);
                if (data.roles[0].name == "program_admin")
                    _this.router.navigate(['admin/dashboard/program-controls']);
                if (data.roles[0].name == "program_director")
                    _this.router.navigate(['admin/dashboard/program-controls']);
                if (data.roles[0].name == "contract_manager")
                    _this.router.navigate(['/dashboard/contract-manager']);
            }
            else if (data.user_type == "startup") {
                _this.router.navigate(['startup/dashboard']);
            }
            else if (data.user_type == "mentor") {
                _this.router.navigate(['mentor/dashboard']);
            }
            // this.router.navigate(['/']);
        }, function (error) { return console.error("couldn't post because", error); });
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedData.currentMessage.subscribe(function (message) {
            _this.message = message;
        });
        this.checkStatus = this.getCookie('Authorization');
        var user_type = this.getCookie('user_type');
        if (this.checkStatus.length != 0) {
            debugger;
            this.loggedIn = true;
            this.router.navigate(['/']);
            // window.location.href = '/';
        }
        else {
            this.loggedIn = false;
        }
    };
    LoginComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    LoginComponent.prototype.newMessage = function () {
        this.sharedData.changeMessage('Hello World');
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_2__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _shared_data_service__WEBPACK_IMPORTED_MODULE_5__["SharedDataService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/mentordashboard/mentordashboard.component.css":
/*!***************************************************************!*\
  !*** ./src/app/mentordashboard/mentordashboard.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbnRvcmRhc2hib2FyZC9tZW50b3JkYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/mentordashboard/mentordashboard.component.html":
/*!****************************************************************!*\
  !*** ./src/app/mentordashboard/mentordashboard.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  mentordashboard works!\n</p>\n"

/***/ }),

/***/ "./src/app/mentordashboard/mentordashboard.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/mentordashboard/mentordashboard.component.ts ***!
  \**************************************************************/
/*! exports provided: MentordashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MentordashboardComponent", function() { return MentordashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MentordashboardComponent = /** @class */ (function () {
    function MentordashboardComponent() {
    }
    MentordashboardComponent.prototype.ngOnInit = function () {
    };
    MentordashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mentordashboard',
            template: __webpack_require__(/*! ./mentordashboard.component.html */ "./src/app/mentordashboard/mentordashboard.component.html"),
            styles: [__webpack_require__(/*! ./mentordashboard.component.css */ "./src/app/mentordashboard/mentordashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MentordashboardComponent);
    return MentordashboardComponent;
}());



/***/ }),

/***/ "./src/app/programs/programs.component.css":
/*!*************************************************!*\
  !*** ./src/app/programs/programs.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZ3JhbXMvcHJvZ3JhbXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7Q0FDbEIiLCJmaWxlIjoic3JjL2FwcC9wcm9ncmFtcy9wcm9ncmFtcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/programs/programs.component.html":
/*!**************************************************!*\
  !*** ./src/app/programs/programs.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 class=\"mar-top\">Current programs</h1>\n<div class=\"row\">\n  <div class=\"row\" *ngFor=\"let live of livePrograms; let i = index\">\n    <a  href=\"#live{{i}}\" class=\"btn btn-info\" data-toggle=\"collapse\" style=\"width:100%;\">{{live.title}}</a>\n    <div id=\"live{{i}}\" class=\"collapse row\">\n      <div class=\"panel panel-default\">\n          <div class=\"panel-body\">\n              <div class=\"row\">\n                  <div clas=\"col-md-12\">\n                    <h3>Programs name: </h3>\n                    <h4>{{live.title}}</h4>\n                  </div>\n                  <div clas=\"col-md-12\">\n                      <h3>Programs Descriptions:</h3>\n                      <h4>{{live.description}}</h4>\n                  </div>\n                  <div clas=\"col-md-12\">\n                    <h3>Application dates</h3>\n                    <div class=\"col-md-6\">\n                      <h3>Application Start date</h3>\n                      <h4>{{live.application_start_date | date}}</h4>\n                    </div>\n                    <div class=\"col-md-6\">\n                      <h3>Application End date</h3>\n                      <h4>{{live.application_end_date | date}}</h4>\n                    </div>\n                  </div>\n                  <div class=\"col-md-12\">\n                    <h3>Program duration</h3>\n                    <h4>{{live.duration}} </h4>\n                  </div>\n                  <div class=\"col-md-12 text-center\">\n                    <button class=\"btn btn-danger\" routerLink=\"registration/{{live.id}}\">Apply</button>\n                  </div>\n                </div>\n          </div>\n      </div>\n    </div>\n  </div>\n\n  \n  <h1>expired programs</h1>\n  <div class=\"row mar-top\">\n    <div class=\"row\" *ngFor=\"let exp of expPrograms; let i = index\">\n      <a  href=\"#exp{{i}}\" class=\"btn btn-info\" data-toggle=\"collapse\" style=\"width:100%;\">{{exp.title}}</a>\n      <div id=\"exp{{i}}\" class=\"collapse row\">\n        <div class=\"panel panel-default\">\nss            <div class=\"panel-body\">\n                <div class=\"row\">\n                    <div clas=\"col-md-12\">\n                      <h3>Programs name: </h3>\n                      <h4>{{exp.title}}</h4>\n                    </div>\n                    <div clas=\"col-md-12\">\n                        <h3>Programs Descriptions:</h3>\n                        <h4>{{exp.description}}</h4>\n                    </div>\n                    <div clas=\"col-md-12\">\n                      <h3>Application dates</h3>\n                      <div class=\"col-md-6\">\n                        <h3>Application Start date</h3>\n                        <h4>{{exp.application_start_date | date}}</h4>\n                      </div>\n                      <div class=\"col-md-6\">\n                        <h3>Application End date</h3>\n                        <h4>{{exp.application_end_date | date}}</h4>\n                      </div>\n                    </div>\n                    <div class=\"col-md-12\">\n                      <h3>Program duration</h3>\n                      <h4>{{exp.duration}} </h4>\n                    </div>\n                    <div class=\"col-md-12 text-center\" >\n                      <button class=\"btn btn-danger\" disabled=\"true\">Apply</button>\n                    </div>\n                  </div>\n            </div>\n        </div>\n      </div>\n    </div>"

/***/ }),

/***/ "./src/app/programs/programs.component.ts":
/*!************************************************!*\
  !*** ./src/app/programs/programs.component.ts ***!
  \************************************************/
/*! exports provided: ProgramsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsComponent", function() { return ProgramsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api-communication.service */ "./src/app/api-communication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-programs',
            template: __webpack_require__(/*! ./programs.component.html */ "./src/app/programs/programs.component.html"),
            styles: [__webpack_require__(/*! ./programs.component.css */ "./src/app/programs/programs.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"]])
    ], ProgramsComponent);
    return ProgramsComponent;
}());



/***/ }),

/***/ "./src/app/programs/registration/programsregistration.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/programs/registration/programsregistration.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n.errmsg{\n    border: 1px solid red;\n}\ninput.ng-invalid.ng-touched  \n{  \n   border-color: red;  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcHJvZ3JhbXMvcmVnaXN0cmF0aW9uL3Byb2dyYW1zcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0NBQ2xCO0FBQ0Q7SUFDSSxzQkFBc0I7Q0FDekI7QUFFRDs7R0FFRyxrQkFBa0I7Q0FDcEIiLCJmaWxlIjoic3JjL2FwcC9wcm9ncmFtcy9yZWdpc3RyYXRpb24vcHJvZ3JhbXNyZWdpc3RyYXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXItdG9wIHtcbiAgICBtYXJnaW4tdG9wOiA4JTtcbn1cbi5lcnJtc2d7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xufVxuXG5pbnB1dC5uZy1pbnZhbGlkLm5nLXRvdWNoZWQgIFxueyAgXG4gICBib3JkZXItY29sb3I6IHJlZDsgIFxufSJdfQ== */"

/***/ }),

/***/ "./src/app/programs/registration/programsregistration.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/programs/registration/programsregistration.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">Apply for program</h2>\n\n<div class=\"panel panel-default\" *ngIf=\"!formSubmitted\">\n        <div class=\"panel-body\">\n            <form #registerform=\"ngForm\" (ngSubmit)=\" handleFormSubmit(registerform)\" novalidate>\n            <div class=\"row\">        \n                <div class=\"col-md-6 form-group\">\n                    <label>Startup Name</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_name\" \n                    placeholder=\"Startup name\" #startup_name=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_name.invalid}\"\n                     required/>\n                     <!-- <span *ngIf=\"registerform.startup_name.touched && !registerform.startup_name.valid\">Please enter the startup name</span> -->\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Founded date</label>\n                    <input type=\"date\" class=\"form-control\" name=\"founded_date\"\n                    #founded_date=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founded_date.invalid}\"\n                    required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Website Url </label>\n                    <input type=\"text\" class=\"form-control\" name=\"website_url\" \n                    #website_url=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && website_url.invalid}\" \n                    placeholder=\"www.startup.com\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Entity Type </label>\n                    <input type=\"text\" class=\"form-control\" name=\"entity_type\" \n                    #entity_type=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && entity_type.invalid}\"  \n                    placeholder=\"Entity type\" required/>\n                </div>\n                <h3 class=\"page-heading\">Founder info:</h3>\n                <div class=\"col-md-6 form-group\">\n                    <label>Name</label>\n                    <input type=\"text\" class=\"form-control\" name=\"founder_name\" \n                    #founder_name=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_name.invalid}\"   \n                    placeholder=\"Enter founder name\" required/>\n                </div> \n                <div class=\"col-md-6 form-group\">\n                    <label>Email</label>\n                    <input type=\"email\" class=\"form-control\" name=\"founder_email\" \n                    #founder_email=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_email.invalid}\" \n                    placeholder=\"Founder@mail.com\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Contact No</label>\n                    <input type=\"number\" class=\"form-control\" name=\"founder_phone_number\"\n                    #founder_phone_number=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_phone_number.invalid}\" \n                     placeholder=\"Enter your Contact Number\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Skills</label>\n                    <textarea class=\"form-control\" name=\"founder_skills\" \n                    #founder_skills=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_skills.invalid}\" \n                    placeholder=\"Enter your skills seperated by comma\" required></textarea>               \n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Credentials</label>\n                    <textarea class=\"form-control\" name=\"founder_credentials\"\n                    #founder_credentials=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_credentials.invalid}\" \n                     placeholder=\"Enter credentials\" required></textarea>               \n                 </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Experience</label>\n                    <textarea class=\"form-control\" name=\"founder_experience\" \n                    #founder_experience=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_experience.invalid}\" \n                    placeholder=\"Enter your experience\" required></textarea>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Commitment</label>\n                    <textarea class=\"form-control\" name=\"founder_commitment\" \n                    #founder_commitment=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && founder_commitment.invalid}\" \n                    placeholder=\"Enter your commitments\" required></textarea>\n                </div>\n            </div>\n            <div class=\"row\">\n                <h3 class=\"page-heading\">Startup Address</h3>\n                <div class=\"col-md-6 form-group\">\n                    <label>Address line 1</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_address_line_1\"\n                    #startup_address_line_1=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_address_line_1.invalid}\" \n                     placeholder=\"Enter your startup address line 1\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Address line 2</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_address_line_2\"\n                    #startup_address_line_2=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_address_line_2.invalid}\" \n                     placeholder=\"Enter your startup address line 2\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>City</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_city\" \n                    #startup_city=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_city.invalid}\" \n                    placeholder=\"Enter your city name\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>State/Province/Region</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_state_province_region\"\n                    #startup_state_province_region=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_state_province_region.invalid}\" \n                     placeholder=\"Enter your State/Province/Region\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Country</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_country\" \n                    #startup_country=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_country.invalid}\" \n                    placeholder=\"Enter your country name\" required/>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label>Zipcode/postalcode</label>\n                    <input type=\"text\" class=\"form-control\" name=\"startup_zip_pincode_postalcode\" \n                    #startup_zip_pincode_postalcode=\"ngModel\" ngModel\n                    [ngClass]=\"{errmsg: registerform.submitted && startup_zip_pincode_postalcode.invalid}\"  \n                    placeholder=\"Enter your Zipcode/postalcode\" required/>\n                </div>\n                <div class=\"col-md-12 text-center\">\n                    <button class=\"btn btn-default\" type=\"submit\">Next</button>\n                </div>\n            </div>\n\n            </form>                       \n        </div>\n</div>\n\n<div class=\"panel panel-default\" *ngIf=\"formSubmitted\">\n<!-- <div class=\"panel panel-default\"> -->\n    <div class=\"panel body\">\n        <form [formGroup]=\"application_questions_form\" (ngSubmit)=\" initAppQuesSubmit(application_questions_form)\">\n        <div class=\"row\" formArrayName=\"application_question\"\n        *ngFor=\"let item of application_questions_form.get('application_question').controls; let i = index;\">\n            <div [formGroupName]=\"i\">\n                <div class=\"col-md-12\">\n                    <p>{{application_questions[i].title}}</p>\n                </div>\n                <div class=\"col-md-12\">\n                    <p>{{application_questions[i].question}}</p>\n                </div>\n                <div class=\"col-md-12\">\n                        <p>{{application_questions[i].description}}</p>\n                </div>\n                <div class=\"col-md-12\">\n                    <textarea formControlName=\"response\" placeholder=\"{{application_questions[i].placeholder}}\" class=\"form-control\"></textarea>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 text-center\">\n            <button class=\"btn btn-default\" type=\"submit\">Submit</button>\n        </div>\n    </form>\n    </div>\n</div>\nt.string \"startup_name\"\nt.string \"founded_date\"\nt.string \"website_url\"\nt.string \"entity_type\"\nt.integer \"program_id\"\nt.integer \"program_status_id\"\nt.datetime \"created_at\", null: false\nt.datetime \"updated_at\", null: false\nt.string \"created_by\"\nt.boolean \"isDelete\", default: false\nt.boolean \"isActive\", default: true\nt.datetime \"deleted_at\"\nt.string \"deleted_by\"\nt.string \"founder_name\"\nt.string \"founder_email\"\nt.string \"founder_phone_number\"\nt.text \"founder_skills\"\nt.text \"founder_credentials\"\nt.text \"founder_experience\"\nt.text \"founder_commitment\"\nt.string \"startup_address_line_1\"\nt.string \"startup_address_line_2\"\nt.string \"startup_city\"\nt.string \"startup_state_province_region\"\nt.string \"startup_zip_pincode_postalcode\"\nt.string \"startup_country\"\nt.string \"startup_geo_location\"\nt.string \"application_status\"\nt.string \"app_status_description\"\nt.boolean \"contract_signed\"\nt.datetime \"contract_signed_date\"\nt.datetime \"contract_received_date\"\nt.boolean \"current_state_form\", default: false\nt.boolean \"current_state_form_reviewed\", default: false\nt.index [\"program_id\"], name: \"index_startup_registrations_on_program_id\"\nt.index [\"program_status_id\"], name: \"index_startup_registrations_on_program_status_id\""

/***/ }),

/***/ "./src/app/programs/registration/programsregistration.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/programs/registration/programsregistration.component.ts ***!
  \*************************************************************************/
/*! exports provided: ProgramsRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramsRegistrationComponent", function() { return ProgramsRegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProgramsRegistrationComponent = /** @class */ (function () {
    function ProgramsRegistrationComponent(apiService, route, fb, router) {
        this.apiService = apiService;
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.formSubmitted = false;
        this.program_id = +this.route.snapshot.paramMap.get('id');
        this.application_questions_form = this.fb.group({
            application_question: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormArray"]([])
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-programsregistration',
            template: __webpack_require__(/*! ./programsregistration.component.html */ "./src/app/programs/registration/programsregistration.component.html"),
            styles: [__webpack_require__(/*! ./programsregistration.component.css */ "./src/app/programs/registration/programsregistration.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ProgramsRegistrationComponent);
    return ProgramsRegistrationComponent;
}());



/***/ }),

/***/ "./src/app/shared-data.service.ts":
/*!****************************************!*\
  !*** ./src/app/shared-data.service.ts ***!
  \****************************************/
/*! exports provided: SharedDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedDataService", function() { return SharedDataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SharedDataService = /** @class */ (function () {
    function SharedDataService() {
        this.messageSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]('default mesaage');
        this.currentMessage = this.messageSource.asObservable();
    }
    SharedDataService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    SharedDataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SharedDataService);
    return SharedDataService;
}());



/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9jb250cmFjdG1hbmFnZXJjb250cm9sL2NvbnRyYWN0Zm9ybS9jb250cmFjdGZvcm0uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7Q0FDbEIiLCJmaWxlIjoic3JjL2FwcC9zaXRlZGFzaGJvYXJkL2NvbnRyYWN0bWFuYWdlcmNvbnRyb2wvY29udHJhY3Rmb3JtL2NvbnRyYWN0Zm9ybS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">Am from contract form</h2>\n\n<div class=\"row\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <form #form=\"ngForm\" >\n                <div class=\"row\">\n                    <div class=\"col-md-12 text-center\">\n                        <h4>Startup Ignite Contract form</h4>\n                    </div>\n                    <div class=\"col-md-12 pull-left\">\n                        <p>Place: chennai</p>\n                        <p>Date: today</p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6 form-group\">\n                        <label>From,</label>\n                        <input type=\"text\" class=\"form-control\" name=\"p_1_name\" [(ngModel)]=\"party1_details.p_1_name\" />\n                        <textarea type=\"text\" class=\"form-control\" name=\"p_1_address\" [(ngModel)]=\"party1_details.p_1_address\" ></textarea>\n                        <input type=\"text\" class=\"form-control\" name=\"p_1_phone_number\" [(ngModel)]=\"party1_details.p_1_phone_number\" />\n                        <input type=\"text\" class=\"form-control\" name=\"p_1_email\" [(ngModel)]=\"party1_details.p_1_email\" />                        \n                    </div>\n                    <div class=\"col-md-6\">\n                        <label>To,</label>\n                        <input type=\"text\" class=\"form-control\" name=\"p_2_name\" [(ngModel)]=\"startup.startup_name\" />\n                        <textarea type=\"text\" class=\"form-control\" name=\"p_2_address\" [(ngModel)]=\"startup_address.startup_add\" ></textarea>\n                        <input type=\"text\" class=\"form-control\" name=\"p_2_phone_number\" [(ngModel)]=\"startup.founder_phone_number\" />\n                        <input type=\"text\" class=\"form-control\" name=\"p_2_email\" [(ngModel)]=\"startup.founder_email\" /> \n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-6 form-group\">\n                        <label>Contract from date</label>\n                        <input class=\"form-control\" name=\"from_date\" ngModel type=\"date\">\n                    </div>\n                    <div class=\"col-md-6 form-group\">\n                        <label>Contract to date</label>\n                        <input class=\"form-control\" name=\"to_date\" ngModel type=\"date\">\n                    </div>\n                    <div class=\"col-md-6 form-group\">\n                        <label>Contract duration in month</label>\n                        <input class=\"form-control\" name=\"duration\" ngModel type=\"date\">\n                    </div>                    \n                </div>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <div class=\"form-group\">\n                            <label for=\"sel1\">Select additional information:</label>\n                            <select class=\"form-control\" id=\"sel1\" (change)=\"onChange($event.target.value)\">\n                                <option></option>\n                                <option >0</option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6\"></div>\n            </form>\n        </div>\n    </div>\n</div>\n\n\nt.integer \"contract_manager_id\"\n    t.integer \"startup_registration_id\"\n    t.integer \"program_id\"\n    t.integer \"additional_contract_information_id\"\n    t.datetime \"from_date\" #using\n    t.datetime \"to_date\" #using\n    t.string \"duration\" #using\n    t.string \"p_1_name\" #using\n    t.text \"p_1_address\" #using\n    t.string \"p_1_phone_number\" #using\n    t.string \"p_1_email\" #using\n    t.string \"p_2_name\" #using\n    t.text \"p_2_address\" #using\n    t.string \"p_2_phone_number\" #using\n    t.string \"p_2_email\" #using\n    t.string \"contract_id\" \n    t.boolean \"accept_terms_condition\", default: false\n    t.boolean \"contract_signed\", default: false\n    t.datetime \"signed_date\"\n    t.boolean \"isActive\", default: true\n    t.boolean \"isDelete\", default: false\n    t.integer \"deleted_by\"\n    t.datetime \"deleted_date\"\n    t.datetime \"contract_send_date\"\n    t.datetime \"created_at\", null: false\n    t.datetime \"updated_at\", null: false\n    t.boolean \"manager_approval\", default: false\n    t.datetime \"manager_approved_date\"\n    t.index [\"additional_contract_information_id\"], name: \"index_contract_forms_on_additional_contract_information_id\"\n    t.index [\"program_id\"], name: \"index_contract_forms_on_program_id\"\n    t.index [\"startup_registration_id\"], name: \"index_contract_forms_on_startup_registration_id\""

/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ContractFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractFormComponent", function() { return ContractFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContractFormComponent = /** @class */ (function () {
    function ContractFormComponent(apiCom, cookieService, router, route) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.site_admin = "site_admin";
        this.contract_manager = "contract_manager";
        this.startup_id = +this.route.snapshot.paramMap.get('id');
        this.party1_details = { p_1_name: "Startup Ignite",
            p_1_address: "Some address, /n some street, /n some villege",
            p_1_phone_number: "8056756218",
            p_1_email: "mail@gmail.com"
        };
    }
    ContractFormComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractFormComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
            if (this.user_role == this.site_admin || this.user_role == this.contract_manager) {
            }
            else {
                this.router.navigate(['/']);
            }
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getStartupReg(this.startup_id);
    };
    ContractFormComponent.prototype.getStartupReg = function (id) {
        var _this = this;
        var url = "program/startup-application-details";
        var data = { startup_application_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.startup = data.startup_application;
            _this.program = data.program;
            _this.setStartupAddress(_this.startup);
        }, function (error) {
            console.log(error);
        });
    };
    ContractFormComponent.prototype.getAddContractInfo = function () {
        var _this = this;
        var url = "get-contract-additional-information";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.addContractInfo = data;
        }, function (error) {
            console.log(error);
        });
    };
    ContractFormComponent.prototype.setStartupAddress = function (startup) {
        this.startup_address = { startup_add: startup.startup_address_line_1 + " ,\n    " + startup.startup_address_line_2 + " ,\n    " + startup.startup_city + ",\n    " + startup.startup_state_province_region + ",\n    " + startup.startup_zip_pincode_postalcode + ",\n    " + startup.startup_country };
    };
    ContractFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contractmanager',
            template: __webpack_require__(/*! ./contractform.component.html */ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.html"),
            styles: [__webpack_require__(/*! ./contractform.component.css */ "./src/app/sitedashboard/contractmanagercontrol/contractform/contractform.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_2__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], ContractFormComponent);
    return ContractFormComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9jb250cmFjdG1hbmFnZXJjb250cm9sL2NvbnRyYWN0bWFuYWdlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtDQUNsQiIsImZpbGUiOiJzcmMvYXBwL3NpdGVkYXNoYm9hcmQvY29udHJhY3RtYW5hZ2VyY29udHJvbC9jb250cmFjdG1hbmFnZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXItdG9wIHtcbiAgICBtYXJnaW4tdG9wOiA4JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">Am from contract controller</h2>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"form-group\" *ngIf=\"program_modules\">\n            <label for=\"sel1\">Select program:</label>\n            <select class=\"form-control\" id=\"sel1\" (change)=\"onChange($event.target.value)\">\n                 <option></option>\n              <option *ngFor=\"let program of program_modules\" value=\"{{program.id}}\">{{program.title}}</option>\n            </select>\n          </div>\n    </div>\n</div>\n<div class=\"row\" *ngIf=\"startups && startups.length == 0\">\n    <div class=\"alert alert-danger\">\n        <strong>Oops!</strong> No startup have accepted for this program.\n    </div>\n</div>\n<div class=\"row\" *ngIf=\"startups && startups.length > 0\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"col-md-12\">\n                <table class=\"table table-bordered\">\n                    <thead>\n                        <tr>\n                        <th>Startup Name</th>\n                        <th>Status</th>\n                        <th>Status description</th>\n                        <th>Score</th>\n                        <th>Action</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let startup of startups\" style=\"cursor: pointer; \">\n                        <td>{{startup.startup_name}}</td>\n                        <td>{{startup.application_status}}</td>\n                        <td>{{startup.app_status_description}}</td>\n                        <td>{{startup.score}}</td>\n                        <td>\n                            <button routerLink=\"{{startup.id}}\">View contract form</button>\n                        </td>\n                        \n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ContractManagerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractManagerComponent", function() { return ContractManagerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContractManagerComponent = /** @class */ (function () {
    function ContractManagerComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.site_admin = "site_admin";
        this.contract_manager = "contract_manager";
    }
    ContractManagerComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ContractManagerComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role');
        this.current_user = this.getCookie('user_id');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
            if (this.user_role == this.site_admin || this.user_role == this.contract_manager) {
            }
            else {
                this.router.navigate(['/']);
            }
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getAllProgram();
    };
    ContractManagerComponent.prototype.getAllProgram = function () {
        var _this = this;
        var url = "contract-manager-programs";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(function (data) {
            _this.program_modules = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ContractManagerComponent.prototype.onChange = function (value) {
        var _this = this;
        debugger;
        var url = "program/show-startup-for-contract";
        var data = { program_id: parseInt(value) };
        debugger;
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            _this.startups = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ContractManagerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contractmanager',
            template: __webpack_require__(/*! ./contractmanager.component.html */ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.html"),
            styles: [__webpack_require__(/*! ./contractmanager.component.css */ "./src/app/sitedashboard/contractmanagercontrol/contractmanager.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ContractManagerComponent);
    return ContractManagerComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/programcontrol.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/programcontrol.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtY29udHJvbC9wcm9ncmFtY29udHJvbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtDQUNsQiIsImZpbGUiOiJzcmMvYXBwL3NpdGVkYXNoYm9hcmQvcHJvZ3JhbWNvbnRyb2wvcHJvZ3JhbWNvbnRyb2wuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXItdG9wIHtcbiAgICBtYXJnaW4tdG9wOiA4JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/programcontrol.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/programcontrol.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">Hi am from program control</h2>\n<div class=\"row\" *ngIf=\"!startup\">\n    <div class=\"col-md-12\">\n            <table class=\"table table-bordered\">\n                <thead>\n                    <tr>\n                    <th>Title</th>\n                    <th>Status</th>\n                    <th>Seat capacity</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let program of allPrograms\" style=\"cursor: pointer;\"\n                        (click)=\"showStartups(program.id)\">\n                    <td>{{program.title}}</td>\n                    <td>{{program.status}}</td>\n                    <td>{{program.seat_size}}</td>\n                    </tr>\n                </tbody>\n            </table>\n    </div>\n</div>\n\n<div class=\"row\" *ngIf=\"showStartup && allStartups.length == 0\">\n    <div class=\"alert alert-danger\">\n        <strong>Oops!</strong> No startup have registered for this program.\n    </div>\n</div>\n<div class=\"row\" *ngIf=\"showStartup && allStartups.length > 0\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <label>List of registered startups</label>\n            <div class=\"col-md-12\">\n                <table class=\"table table-bordered\">\n                    <thead>\n                        <tr>\n                        <th>Startup Name</th>\n                        <th>Status</th>\n                        <th>Status description</th>\n                        <th>Score</th>\n                        <th>Action</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let startup of allStartups\" style=\"cursor: pointer; \">\n                        <td>{{startup.startup_name}}</td>\n                        <td>{{startup.application_status}}</td>\n                        <td>{{startup.app_status_description}}</td>\n                        <td>{{startup.score}}</td>\n                        <td>\n                            <button routerLink=\"startup/{{startup.id}}\">Review</button>\n                        </td>\n                        \n                        </tr>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n\n<!-- app_status_description: \"Application registered\"\napplication_status: \"PR\"\ncontract_received_date: null\ncontract_signed: null\ncontract_signed_date: null\ncreated_at: \"2019-01-03T12:04:51.637Z\"\ncreated_by: null\ncurrent_state_form: false\ncurrent_state_form_reviewed: false\ndeleted_at: null\ndeleted_by: null\nentity_type: \"demo\"\nfounded_date: \"2019-01-03\"\nfounder_commitment: \"demo\"\nfounder_credentials: \"demo\"\nfounder_email: \"demo\"\nfounder_experience: \"demo\"\nfounder_name: \"demo\"\nfounder_phone_number: \"121312\"\nfounder_skills: \"demo\"\nid: 6\nisActive: true\nisDelete: false\nprogram_id: 4\nprogram_status_id: 1\nstartup_address_line_1: \"demo\"\nstartup_address_line_2: \"demo\"\nstartup_city: \"demo\"\nstartup_country: \"demo\"\nstartup_geo_location: null\nstartup_name: \"demo\"\nstartup_state_province_region: \"demo\"\nstartup_zip_pincode_postalcode: \"demo\"\nupdated_at: \"2019-01-03T12:04:51.637Z\"\nwebsite_url: \"demo\" -->"

/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/programcontrol.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/programcontrol.component.ts ***!
  \**************************************************************************/
/*! exports provided: ProgramControlComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramControlComponent", function() { return ProgramControlComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProgramControlComponent = /** @class */ (function () {
    function ProgramControlComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.getUserUrl = 'get-user-details';
        this.showStartup = false;
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
        if (this.authToken.length != 0) {
            this.showStartups(this.location_program_id);
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
    };
    ProgramControlComponent.prototype.showStartups = function (id) {
        var _this = this;
        var data = { "program_id": id };
        this.cookieService.set('program_id', id, 30, '/admin/dashboard/program-controls');
        var url = "program/show-startup-program-wise";
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
            _this.allStartups = data;
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
    ProgramControlComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-programcontrol',
            template: __webpack_require__(/*! ./programcontrol.component.html */ "./src/app/sitedashboard/programcontrol/programcontrol.component.html"),
            styles: [__webpack_require__(/*! ./programcontrol.component.css */ "./src/app/sitedashboard/programcontrol/programcontrol.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ProgramControlComponent);
    return ProgramControlComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.css":
/*!******************************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".score{\nposition: fixed;\ntop: 22%;\nleft: 90%;\nbackground: yellow;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtY29udHJvbC9zdGFydHVwY29udHJvbC9zdGFydHVwY29udHJvbC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsZ0JBQWdCO0FBQ2hCLFNBQVM7QUFDVCxVQUFVO0FBQ1YsbUJBQW1CO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtY29udHJvbC9zdGFydHVwY29udHJvbC9zdGFydHVwY29udHJvbC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNjb3Jle1xucG9zaXRpb246IGZpeGVkO1xudG9wOiAyMiU7XG5sZWZ0OiA5MCU7XG5iYWNrZ3JvdW5kOiB5ZWxsb3c7XG59Il19 */"

/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--Startup details-->\n<div class=\"row score\" *ngIf=\"startup\"><label>Score</label>\n    <div class=\"text-center\">{{startup.score}}</div>\n</div>\n<div class=\"row\" *ngIf=\"startup\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <div class=\"col-md-12\">\n                <h4 class=\"page-heading\">Startup Info</h4>\n                <div class=\"col-md-4\"><label>Startup Name:</label>\n                    {{startup.startup_name}}\n                </div>\n                <div class=\"col-md-4\"><label>Founded date:</label>\n                    {{startup.founded_date}}\n                </div>\n                <div class=\"col-md-4\"><label>Entity type:</label>\n                    {{startup.entity_type}}\n                </div>\n                <div class=\"col-md-4\"><label>Company website:</label>\n                    {{startup.website_url}}\n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                <h4 class=\"page-heading\">Application Status</h4>\n                <div class=\"col-md-4\"><label>Application status:</label>\n                    {{startup.application_status}}\n                </div>\n                <div class=\"col-md-4\"><label>Status Description:</label>\n                    {{startup.app_status_description}}\n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                <h4 class=\"page-heading\">Founder info:</h4>\n                <div class=\"col-md-4\"><label>Founder Name:</label>\n                    {{startup.founder_name}}\n                </div>\n                <div class=\"col-md-4\"><label>Email:</label>\n                    {{startup.founder_email}}\n                </div>\n                <div class=\"col-md-4\"><label>Contact number:</label>\n                    {{startup.founder_phone_number}}\n                </div>\n                <div class=\"col-md-4\"><label>Skills</label>\n                    {{startup.founder_skills}}\n                </div>\n                <div class=\"col-md-4\"><label>Commitment</label>\n                    {{startup.founder_commitment}}\n                </div>\n                <div class=\"col-md-4\"><label>Experience</label>\n                    {{startup.founder_experience}}\n                </div>\n                <div class=\"col-md-4\"><label>Credentials</label>\n                    {{startup.founder_credentials}}\n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                <h4 class=\"page-heading\">Startup Address:</h4>\n                <div class=\"col-md-4\"><label>Startup address line 1</label>\n                    {{startup.startup_address_line_1}}\n\n                </div>\n                <div class=\"col-md-4\"><label>Startup address line 2</label>\n                    {{startup.startup_address_line_2}}\n\n                </div>\n                <div class=\"col-md-4\"><label>Startup city</label>\n                    {{startup.startup_city}}\n\n                </div>\n                <div class=\"col-md-4\"><label>Startup state province region</label>\n                    {{startup.startup_state_province_region}}\n\n                </div>\n                <div class=\"col-md-4\"><label>Startup country</label>\n                    {{startup.startup_country}}\n\n                </div>\n                <div class=\"col-md-4\"><label>Startup zip pincode postalcode</label>\n                    {{startup.startup_zip_pincode_postalcode}}\n\n                </div>\n                <div class=\"col-md-12\" *ngIf=\"startup.application_status == 'RC'\">\n                    <button class=\"btn btn-success\" (click)=\"startupAccept(startup.id)\">Accept</button>\n                    <button class=\"btn btn-danger\" (click)=\"startupReject(startup.id)\">Reject</button>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!--End-->\n<div class=\"row\" *ngIf=\"appRespQues\">\n    <form #form=\"ngForm\" (ngSubmit)=\"submitAdminResponse(form)\">\n        <h4>Review startup responses</h4>\n        <div class=\"col-md-12\" *ngFor=\"let app_res of appRespQues; let i = index\">\n            \n            <div class=\"col-md-12\"><label>Title</label>\n                {{app_res.application_question.title}}\n            </div>\n            <div class=\"col-md-12\"><label>Description</label>\n                {{app_res.application_question.description}}\n            </div>\n            <div class=\"col-md-12\"><label>Question</label>\n                {{app_res.application_question.question}}\n            </div>\n            <div class=\"col-md-12\"><label>Startup Response</label>\n                {{app_res.response}}\n                {{app_res.admin_response}}\n            </div>\n            <div *ngIf=\"app_res.admin_response\">\n                <div class=\"col-md-12\"><label>Admin Response</label>\n                    {{app_res.reviewer_feedback}}\n                </div>\n                <div class=\"col-md-12\"><label>Admin Response</label>\n                    {{app_res.reviewer_rating}}\n                </div>\n                <div class=\"col-md-12\">\n                    <button class=\"btn btn-default\" (click)=\"app_res.admin_response = false\">Edit</button>\n                </div>\n                <br>\n            </div>\n            <div ngModelGroup=\"{{i}}\" *ngIf=\"!app_res.admin_response\">\n                <div class=\"col-md-12 form-group\"><label>Admin Feedback</label>\n                    <input type=\"hidden\" name=\"id\" [(ngModel)]=\"app_res.id\" >\n                    <input type=\"hidden\" name=\"application_question_id\" [(ngModel)]=\"app_res.application_question.id\">\n                    <textarea class=\"form-control\" type=\"text\" [(ngModel)]=\"i.reviewer_feedback\" name=\"reviewer_feedback\"></textarea>\n                </div>\n                <div class=\"col-md-12 form-group\"><label>Admin rating</label>\n                    <div class=\"form-group\">\n                        <select class=\"form-control\" id=\"sel1\" [(ngModel)]=\"i.reviewer_rating\" name=\"reviewer_rating\">\n                            <option value=\"1\">1</option>\n                            <option value=\"2\">2</option>\n                            <option value=\"3\">3</option>\n                            <option value=\"4\">4</option>\n                            <option value=\"5\">5</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 text-center\">\n            <button class=\"btn btn-default\" type=\"submit\" >Submit</button>\n        </div>\n    </form>\n</div>"

/***/ }),

/***/ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: StartupControlComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupControlComponent", function() { return StartupControlComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StartupControlComponent = /** @class */ (function () {
    function StartupControlComponent(apiCom, cookieService, router, route) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.route = route;
        this.startup_id = +this.route.snapshot.paramMap.get('id');
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
            debugger;
        }, function (error) {
            debugger;
            console.log(data);
        });
    };
    StartupControlComponent.prototype.submitAdminResponse = function (form) {
        debugger;
        var url = "admin-feedback-for-startup-response";
        var data = { application_questions_response: form.value };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.startupAccept = function (id) {
        debugger;
        var url = "startup-accept-by-admin";
        var data = { startup_registration_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent.prototype.startupReject = function (id) {
        debugger;
        var url = "startup-reject-by-admin";
        var data = { startup_registration_id: id };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    StartupControlComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-startupcontrol',
            template: __webpack_require__(/*! ./startupcontrol.component.html */ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.html"),
            styles: [__webpack_require__(/*! ./startupcontrol.component.css */ "./src/app/sitedashboard/programcontrol/startupcontrol/startupcontrol.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], StartupControlComponent);
    return StartupControlComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/createprogram/createprogram.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n.errmsg{\n    border: 1px solid red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtbW9kdWxlL2NyZWF0ZXByb2dyYW0vY3JlYXRlcHJvZ3JhbS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtDQUNsQjtBQUNEO0lBQ0ksc0JBQXNCO0NBQ3pCIiwiZmlsZSI6InNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtbW9kdWxlL2NyZWF0ZXByb2dyYW0vY3JlYXRlcHJvZ3JhbS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufVxuLmVycm1zZ3tcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/createprogram/createprogram.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">Create new program</h2>\n<div class=\"row\">\n    <form [formGroup]='program' *ngIf=\"showForm\" (ngSubmit)=\" onProgramSubmit(program,datas)\" validate>\n        <div >\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height:60px;\">Select Program Type\n                    <button class=\"btn btn-success pull-right\" data-toggle=\"modal\" data-target=\"#programTypeModel\">Create Program type</button>\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"col-md-12 form-group\">\n                            <div class=\"form-group\">\n                                <label for=\"sel1\">Select Program type:</label>\n                                <select class=\"form-control\" id=\"sel1\" formControlName=\"program_type_id\" [ngClass]=\"{errmsg: !program.controls['program_type_id'].valid && submitted}\">\n                                    <option *ngFor=\"let program_type of datas.program_types\" [value]=\"program_type.id\">{{program_type.program_type_title}}</option>\n                                </select>\n                            </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height:60px;\">Select program location\n                    <button class=\"btn btn-success pull-right\">Create Program location</button>\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"col-md-12 form-group\">\n                            <div class=\"form-group\">\n                                <label for=\"sel1\">Select Program location:</label>\n                                <select class=\"form-control\" id=\"sel1\" formControlName=\"ProgramLocation_id\" [ngClass]=\"{errmsg: !program.controls['ProgramLocation_id'].valid && submitted}\">\n                                    <option [value]=\" \"></option>\n                                    <option *ngFor=\"let program_location of datas.program_locations\" [value]=\"program_location.id\">City: {{program_location.city}},State: {{program_location.state_province_region}}</option>\n                                </select>\n                            </div>\n                    </div>\n                    <!-- <div class=\"col-md-12\">\n\n                    </div> -->\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height:60px;\">Select Framework\n                    <!-- <button class=\"btn btn-success pull-right\">Create Program location</button> -->\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"col-md-12 form-group\">\n                            <div class=\"form-group\">\n                                <label for=\"sel1\">Select Framework:</label>\n                                <select class=\"form-control\" id=\"sel1\" formControlName=\"framework_id\" [ngClass]=\"{errmsg: !program.controls['framework_id'].valid && submitted}\">\n                                    <option [value]=\" \"></option>\n                                    <option *ngFor=\"let framework of datas.frameworks\" [value]=\"framework.id\">{{framework.title}}</option>\n                                </select>\n                            </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height:60px;\">Program details\n                    <!-- <button class=\"btn btn-success pull-right\">Create Program location</button> -->\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"col-md-4 form-group\">\n                        <label>Title:</label>\n                        <input class=\"form-control\" type=\"text\" name=\"\" formControlName=\"title\"\n                         [ngClass]=\"{errmsg: !program.controls['title'].valid && submitted}\"  required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Start date:</label>\n                        <input class=\"form-control\" type=\"date\" name=\"start_date\" formControlName=\"start_date\"\n                        [ngClass]=\"{errmsg: !program.controls['start_date'].valid && submitted}\" required />\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>End date:</label>\n                        <input class=\"form-control\" type=\"date\" name=\"end_date\" formControlName=\"end_date\" \n                        [ngClass]=\"{errmsg: !program.controls['end_date'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Enter seat capacity:</label>\n                        <input class=\"form-control\" type=\"number\" name=\"seat_size\" formControlName=\"seat_size\"\n                        [ngClass]=\"{errmsg: !program.controls['seat_size'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Industry:</label>\n                        <input class=\"form-control\" type=\"text\" name=\"industry\" formControlName=\"industry\" \n                        [ngClass]=\"{errmsg: !program.controls['industry'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Main image:</label>\n                        <input class=\"form-control\" type=\"file\" name=\"main_image\" formControlName=\"main_image\"\n                        [ngClass]=\"{errmsg: !program.controls['main_image'].valid && submitted}\" />\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Logo image:</label>\n                        <input class=\"form-control\" type=\"file\" name=\"logo_image\" formControlName=\"logo_image\" \n                        [ngClass]=\"{errmsg: !program.controls['logo_image'].valid && submitted}\" />\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Duration in months:</label>\n                        <input class=\"form-control\" type=\"text\" name=\"duration\" formControlName=\"duration\"\n                        [ngClass]=\"{errmsg: !program.controls['duration'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Program registration start date:</label>\n                        <input class=\"form-control\" type=\"date\" name=\"application_start_date\" formControlName=\"application_start_date\" \n                        [ngClass]=\"{errmsg: !program.controls['application_start_date'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Program registration end date:</label>\n                        <input class=\"form-control\" type=\"date\" name=\"application_end_date\" formControlName=\"application_end_date\" \n                        [ngClass]=\"{errmsg: !program.controls['application_end_date'].valid && submitted}\" required/>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label>Program Description:</label>\n                        <textarea class=\"form-control\"  name=\"description\" formControlName=\"description\" \n                        [ngClass]=\"{errmsg: !program.controls['description'].valid && submitted}\" required></textarea>\n                    </div>  \n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height:60px;\">Role assign\n                    <!-- <button class=\"btn btn-success pull-right\">Create Program location</button> -->\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"col-md-4 form-group\">\n                        <label for=\"sel1\">Select program Admin:</label>\n                        <select class=\"form-control\" id=\"sel1\" formControlName=\"program_admin\" [ngClass]=\"{errmsg: !program.controls['program_admin'].valid && submitted}\">\n                            <option [value]=\" \"> </option>\n                            <option *ngFor=\"let program_admin of datas.users.program_admin\" [value]=\"program_admin.id\">{{program_admin.full_name}}</option>\n                        </select>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label for=\"sel1\">Select program Director:</label>\n                        <select class=\"form-control\" id=\"sel1\" formControlName=\"program_director\" [ngClass]=\"{errmsg: !program.controls['program_director'].valid && submitted}\">\n                            <option [value]=\" \"></option>\n                            <option *ngFor=\"let program_director of datas.users.program_director\" [value]=\"program_director.id\">{{program_director.full_name}}</option>\n                        </select>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label for=\"sel1\">Select Application manager:</label>\n                        <select class=\"form-control\" id=\"sel1\" formControlName=\"application_manager\" [ngClass]=\"{errmsg: !program.controls['application_manager'].valid && submitted}\">\n                            <option [value]=\" \"></option>\n                            <option *ngFor=\"let application_manager of datas.users.application_manager\" [value]=\"application_manager.id\">{{application_manager.full_name}}</option>\n                        </select>\n                    </div>\n                    <div class=\"col-md-4 form-group\">\n                        <label for=\"sel1\">Select contract manager:</label>\n                        <select class=\"form-control\" id=\"sel1\" formControlName=\"contract_manager\" [ngClass]=\"{errmsg: !program.controls['contract_manager'].valid && submitted}\" required>\n                            <option [value]=\" \"> </option>\n                            <option *ngFor=\"let contract_manager of datas.users.contract_manager\" [value]=\"contract_manager.id\">{{contract_manager.full_name}}</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n        </div>\n        </div>\n        <div class=\"col-md-12\" formArrayName=\"application_questions\" *ngIf=\"hideArrayControl\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\">\n                    Program registration questions\n                </div>\n                <div class=\"panel-body\">\n                    <div class=\"row\" *ngFor=\"let app_ques of program.controls.application_questions.controls; let i = index\">\n                        <div class=\"col-md-12\" >\n                            <input type=\"checkbox\"  [formControlName]=\"i\">\n                            <b>Questions: </b>\n                            <span>{{datas.application_questions[i].question}}</span>\n                          </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"col-md-12 text-center\">\n            <button class=\"btn btn-default\" type=\"submit\"  >Create program</button>\n            <p style=\"color:red;\" *ngIf=\"!program.controls.valid && submitted\">Please fill up the following fields</p>\n        </div>                        \n    </form>\n</div>\n\n\n\n<!--Model for new program type-->\n  <!-- Modal -->\n<div class=\"modal fade\" id=\"programTypeModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Modal Header</h4>\n        </div>\n        <div class=\"modal-body\">\n            <p>This is a large modal.</p>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        </div>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"modal fade\" id=\"reviewAndSubmitModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Review and submit</h4>\n        </div>\n        <div class=\"modal-body\" *ngIf=\"showReviewAndSubmit\">\n            <div class=\"row\">\n            <div class=\"col-md-12\">\n                <h3 class=\"page-heading\">Program Type</h3>\n                <div class=\"col-md-4\">\n                    <label>Title:</label>\n                    <p>{{reviewAndSubmit.program_type.program_type_title}}</p>\n                </div>\n                <div class=\"col-md-4\">\n                    <label>Description:</label>\n                    <p>{{reviewAndSubmit.program_type.program_type_description}}</p>\n                </div>\n                <div class=\"col-md-4\">\n                    <label>Duration:</label>\n                    <p>{{reviewAndSubmit.program_type.program_type_duration}}</p>    \n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                <h3 class=\"page-heading\">Program Location</h3>\n                <div class=\"col-md-3\">\n                     <label>Address line 1:</label>\n                     <p>{{reviewAndSubmit.program_location.address_line_1}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Address line 2:</label>\n                    <p>{{reviewAndSubmit.program_location.address_line_2}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>City:</label>\n                    <p>{{reviewAndSubmit.program_location.city}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>State:</label>\n                    <p>{{reviewAndSubmit.program_location.state_province_region}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Country: </label>\n                    <p>{{reviewAndSubmit.program_location.country}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Pincode or Zip: </label>    \n                    <p>{{reviewAndSubmit.program_location.zip_pincode_postalcode}}</p>\n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                    <h3 class=\"page-heading\">Framework</h3>\n\n                <div class=\"col-md-4\">\n                    <label>Title: </label>\n                    <p>{{reviewAndSubmit.framework.title}}</p>      \n                </div>\n                <div class=\"col-md-4\">\n                    <label>Description: </label>\n                    <p>{{reviewAndSubmit.framework.description}}</p>      \n                </div>\n                <div class=\"col-md-4\">\n                    <label>Level: </label>\n                    <p>{{reviewAndSubmit.framework.level}}</p>      \n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                    <h3 class=\"page-heading\">Program Details</h3>\n                <div class=\"col-md-3\">\n                    <label>Title: </label>\n                    <p>{{reviewAndSubmit.program_details.title}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Description: </label>\n                    <p>{{reviewAndSubmit.program_details.description}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Start date:</label>     \n                    <p>{{reviewAndSubmit.program_details.start_date}}</p> \n                </div>\n                <div class=\"col-md-3\">\n                    <label>End date: </label>\n                    <p>{{reviewAndSubmit.program_details.end_date}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Seat size: </label>\n                    <p>{{reviewAndSubmit.program_details.seat_size}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Industry:</label>    \n                    <p>{{reviewAndSubmit.program_details.industry}}</p>  \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Main Image: </label>  \n                    <p>{{reviewAndSubmit.program_details.main_image}}</p>    \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Logo image: </label>\n                    <p>{{reviewAndSubmit.program_details.logo_image}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Duration: </label>\n                    <p>{{reviewAndSubmit.program_details.duration}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Application start date: </label>\n                    <p>{{reviewAndSubmit.program_details.application_start_date}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Application end date: </label>\n                    <p>{{reviewAndSubmit.program_details.application_end_date}}</p>      \n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                    <h2 class=\"page-heading\">Program Administrators</h2>\n                <div class=\"col-md-3\">\n                    <label>Program admin: </label>\n                    <p>{{reviewAndSubmit.program_admin.full_name}}</p>\n                </div>\n                <div class=\"col-md-3\">\n                    <label>Program Director: </label>\n                    <p>{{reviewAndSubmit.program_director.full_name}}</p>      \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Application Manager: </label> \n                    <p>{{reviewAndSubmit.application_manager.full_name}}</p>     \n                </div>\n                <div class=\"col-md-3\">\n                    <label>Contract Manager: </label>\n                    <p>{{reviewAndSubmit.contract_manager.full_name}}</p>      \n                </div>\n            </div>\n            <div class=\"col-md-12\">\n                    <h2 class=\"page-heading\">Application registration questions</h2>\n                <div class=\"col-md-12\" *ngFor=\"let app_que of reviewAndSubmit.application_questions; let i = index\">\n                    <label>Question No: {{i + 1}} </label>\n                    <p>{{app_que.question}}</p>\n                </div>\n            </div>\n            <div class=\"col-md-12 text-center\">\n                <button class=\"btn btn-success\" (click)=\"onSubmitProgramForms()\">Submit</button>\n            </div>\n            </div>\n        </div>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/createprogram/createprogram.component.ts ***!
  \**************************************************************************************/
/*! exports provided: CreateProgramComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateProgramComponent", function() { return CreateProgramComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





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
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            start_date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            end_date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            seat_size: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            industry: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            main_image: [''],
            logo_image: [''],
            duration: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            application_start_date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            application_end_date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            ProgramLocation_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            program_type_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            framework_id: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            program_admin: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            program_director: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            application_manager: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            contract_manager: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            application_questions: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormArray"](controls)
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
            var controls = data.application_questions.map(function (c) { return new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](false); });
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-createprogram',
            template: __webpack_require__(/*! ./createprogram.component.html */ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.html"),
            styles: [__webpack_require__(/*! ./createprogram.component.css */ "./src/app/sitedashboard/programmodule/createprogram/createprogram.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _api_communication_service__WEBPACK_IMPORTED_MODULE_2__["ApiCommunicationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], CreateProgramComponent);
    return CreateProgramComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/programmodule/programmodule.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/programmodule.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9wcm9ncmFtbW9kdWxlL3Byb2dyYW1tb2R1bGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7Q0FDbEIiLCJmaWxlIjoic3JjL2FwcC9zaXRlZGFzaGJvYXJkL3Byb2dyYW1tb2R1bGUvcHJvZ3JhbW1vZHVsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/sitedashboard/programmodule/programmodule.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/programmodule.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top\">From program Module</h2>\n<div class=\"col-md-12\">\n    <button class=\"btn btn-success\" routerLink=\"create-program\">Create new program</button>\n</div>\n<div class=\"col-md-12\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">List of Programs</div>\n        <div class=\"panel-body\">\n                <table class=\"table table-bordered\">\n                    <thead>\n                        <tr>\n                        <th>Title</th>\n                        <th>Start Date</th>\n                        <th>End Date</th>\n                        <th>Duration</th>\n                        <th>Seat Size</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let program of program_modules.programs\">\n                        <td>{{program.title}}</td>\n                        <td>{{program.start_date}}</td>\n                        <td>{{program.end_date}}</td>\n                        <td>{{program.duration}}</td>\n                        <td>{{program.seat_size}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n        </div>\n    </div>\n</div>\n\n<div class=\"col-md-12\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">List of Program types</div>\n        <div class=\"panel-body\">\n                <table class=\"table table-bordered\">\n                    <thead>\n                        <tr>\n                        <th>Title</th>\n                        <th>Description</th>\n                        <th>Logo</th>\n                        <th>Duration</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let program_type of program_modules.program_types\">\n                        <td>{{program_type.program_type_title}}</td>\n                        <td>{{program_type.program_type_description}}</td>\n                        <td>{{program_type.program_type_logo}}</td>\n                        <td>{{program_type.duration}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n        </div>\n    </div>\n</div>\n\n<div class=\"col-md-12\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">List of Program Locations</div>\n            <div class=\"panel-body\">\n                    <table class=\"table table-bordered\">\n                        <thead>\n                            <tr>\n                            <th>Country</th>\n                            <th>State</th>\n                            <th>City</th>\n                            <th>Address</th>\n                            <th>Postalcode</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let program_location of program_modules.program_locations\">\n                            <td>{{program_location.country}}</td>\n                            <td>{{program_location.state_province_region}}</td>\n                            <td>{{program_location.city}}</td>\n                            <td>{{program_location.address_line_1}}</td>\n                            <td>{{program_location.zip_pincode_postalcode}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n            </div>\n        </div>\n    </div>\n"

/***/ }),

/***/ "./src/app/sitedashboard/programmodule/programmodule.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/sitedashboard/programmodule/programmodule.component.ts ***!
  \************************************************************************/
/*! exports provided: ProgramModuleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgramModuleComponent", function() { return ProgramModuleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProgramModuleComponent = /** @class */ (function () {
    function ProgramModuleComponent(cookieService, formBuilder, apiService) {
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.program_modules = [];
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
    }
    ProgramModuleComponent.prototype.ngOnInit = function () {
        this.getAllProgram();
    };
    ProgramModuleComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    ProgramModuleComponent.prototype.getAllProgram = function () {
        var _this = this;
        this.apiService.getDataWithAuth("show-programs", this.auth)
            .subscribe(function (data) {
            _this.program_modules = data;
            console.log(data);
        }, function (error) {
            console.log("Following error has occured: " + error);
        });
    };
    ProgramModuleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-programmodule',
            template: __webpack_require__(/*! ./programmodule.component.html */ "./src/app/sitedashboard/programmodule/programmodule.component.html"),
            styles: [__webpack_require__(/*! ./programmodule.component.css */ "./src/app/sitedashboard/programmodule/programmodule.component.css")]
        }),
        __metadata("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _api_communication_service__WEBPACK_IMPORTED_MODULE_2__["ApiCommunicationService"]])
    ], ProgramModuleComponent);
    return ProgramModuleComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/sitedashboard.component.css":
/*!***********************************************************!*\
  !*** ./src/app/sitedashboard/sitedashboard.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC9zaXRlZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvc2l0ZWRhc2hib2FyZC9zaXRlZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFyLXRvcCB7XG4gICAgbWFyZ2luLXRvcDogOCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/sitedashboard/sitedashboard.component.html":
/*!************************************************************!*\
  !*** ./src/app/sitedashboard/sitedashboard.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mar-top\">\n  <!-- <h2>{{this.user_details.user.full_name | uppercase}} welcome to site dashboard</h2>{{this.user_details.user.full_name}} -->\n</div>\n<div class=\"col-md-3\">\n  <button class=\"btn btn-default\" routerLink=\"user\">User Module</button>\n</div>\n<div class=\"col-md-3\">\n  <button class=\"btn btn-default\" routerLink=\"program\">Programs module</button>\n</div>\n<div class=\"col-md-3\">\n  <button class=\"btn btn-default\" (click)=\"changeEleControl('framework_module')\">FrameWork Module</button>\n</div>\n<div class=\"col-md-3\">\n  <button class=\"btn btn-default\" routerLink=\"program-controls\">Program Control</button>\n</div>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/sitedashboard/sitedashboard.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/sitedashboard/sitedashboard.component.ts ***!
  \**********************************************************/
/*! exports provided: SitedashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitedashboardComponent", function() { return SitedashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SitedashboardComponent = /** @class */ (function () {
    function SitedashboardComponent(apiCom, cookieService, router) {
        this.apiCom = apiCom;
        this.cookieService = cookieService;
        this.router = router;
        this.getUserUrl = 'get-user-details';
    }
    SitedashboardComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    SitedashboardComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
            .subscribe(function (data) {
            console.log("success!", data);
            _this.user_details = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    SitedashboardComponent.prototype.ngOnInit = function () {
        this.authToken = this.getCookie('Authorization');
        if (this.authToken.length != 0) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getUserDetails();
    };
    SitedashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sitedashboard',
            template: __webpack_require__(/*! ./sitedashboard.component.html */ "./src/app/sitedashboard/sitedashboard.component.html"),
            styles: [__webpack_require__(/*! ./sitedashboard.component.css */ "./src/app/sitedashboard/sitedashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_api_communication_service__WEBPACK_IMPORTED_MODULE_1__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], SitedashboardComponent);
    return SitedashboardComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/usercontroller/usercontroller.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/sitedashboard/usercontroller/usercontroller.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC91c2VyY29udHJvbGxlci91c2VyY29udHJvbGxlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtDQUNsQiIsImZpbGUiOiJzcmMvYXBwL3NpdGVkYXNoYm9hcmQvdXNlcmNvbnRyb2xsZXIvdXNlcmNvbnRyb2xsZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXItdG9wIHtcbiAgICBtYXJnaW4tdG9wOiA4JTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/sitedashboard/usercontroller/usercontroller.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/sitedashboard/usercontroller/usercontroller.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"mar-top \">User Controller component</h2>\n<div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Edit user details</div>\n    <div class=\"panel-body\">\n            <div class=\"row\">\n                <div class=\"col-md-12\" *ngIf=\"showForm\">\n                    <form [formGroup]='user' (ngSubmit)=\"user.valid && onSubmit(user)\" >\n                        <div formGroupName='user'>  \n                            <div class=\"col-md-6 form-group\">\n                                <label for=\"user_type\">Slect user type</label>\n                                <select class=\"form-control\" id=\"user_type\"\n                                        formControlName=\"user_type\"\n                                        (change)=\"getRoles($event.target.value)\">\n                                <option *ngFor=\"let value of userOptions\" [value]=\"value.value\">{{value.name}}</option>\n                                <!-- <option [value]=\"mentor\">mentor</option> -->\n                                <!-- <option [ngValue]=\"startup\">Startup User</option> -->\n                                </select>\n                            </div>\n                            <div class=\"col-md-6 form-group\">\n                                <label for=\"first_name\">First name</label>\n                                <input class=\"form-control\" type=\"text\"\n                                    id=\"first_name\" placeholder=\"First name\" \n                                    name=\"first\" formControlName=\"first_name\" \n                                    required />\n                            </div>\n                            <div class=\"col-md-6 form-group\">\n                                    <label for=\"last_name\">Last name</label>\n                                    <input class=\"form-control\" type=\"text\" id=\"last_name\" name=\"last\"\n                                            placeholder=\"Last name\" formControlName=\"last_name\"  required  />\n                            </div>\n                            <div class=\"col-md-6 form-group\">\n                                    <label for=\"email\">Email id</label>\n                                    <input class=\"form-control\" type=\"email\"\n                                    id=\"email\" placeholder=\"Email\" name=\"mail\" formControlName=\"email\"\n                                    required email />\n                            </div>\n                            <div class=\"col-md-6 form-group\">\n                                    <label for=\"phone_number\">Phone number</label>\n                                    <input class=\"form-control\" type=\"text\" id=\"phone_number\" name=\"number\"\n                                    placeholder=\"Phone number\" formControlName=\"phone_number\" \n                                    required minlength=\"10\" maxlength=\"15\"/>\n                            </div>\n                            <div class=\"col-md-6 form-group\" *ngIf=\"userDatas[0].roles.length > 0\">\n                                <div *ngFor=\"let role of userDatas[0].roles\">\n                                        <p>Current Role: {{role.name}}</p>\n                                        <button class=\"btn btn-danger\" (click)=\"deleteRole(userDatas[0].user.id,role.id)\">Delete role</button>\n                                </div>\n                        </div>\n                        </div>\n            \n                            <div class=\"col-md-6 form-group\" formGroupName='role'>\n                                <label for=\"user_type\">Change role</label>\n                                <select class=\"form-control\" id=\"role\"\n                                            formControlName=\"role_id\">\n                                    <option *ngFor=\"let role of roles\" [value]=\"role.id\">{{role.name}}</option>\n                                    <!-- <option [value]=\"mentor\">mentor</option> -->\n                                    <!-- <option [ngValue]=\"startup\">Startup User</option> -->\n                                </select>\n                            </div>\n                            <div class=\"col-md-12 text-center\">\n                                    <button [disabled]= \"!user.valid\" class=\"btn btn-primary\">update</button>\n                            </div>\n                    </form>\n                </div>\n            </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <button type=\"button\" class=\"btn btn-info\" data-toggle=\"collapse\" data-target=\"#demo\" style=\"width:100%;\">Show Privileges</button>\n        <div id=\"demo\" class=\"collapse\">\n            <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" style=\"height: 60px;\">List of User Privileges\n                    <button class=\"btn btn-success pull-right\" data-toggle=\"modal\" data-target=\"#createPrivilegemodel\">Create new privileges</button>\n                </div>\n                <div class=\"panel-body\">Panel Content\n                    <div class=\"row\" *ngFor=\"let privilege of privileges\">\n                        <h3>Previleges for {{privilege.module_type_name}} module</h3>\n                        <div class=\"col-md-4\">\n                            <label>Module Type: <span>{{privilege.module_type_name}}</span></label>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label>Role : <span>{{privilege.role_name}}</span></label>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label>Create Rule : <span>{{privilege.create_rule}}</span></label>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label>Update Rule : <span>{{privilege.update_rule}}</span></label>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label>Show Rule : <span>{{privilege.show_rule}}</span></label>\n                        </div>\n                        <div class=\"col-md-4\">\n                            <label>Delete Rule : <span>{{privilege.delete_rule}}</span></label>\n                        </div>\n                        <div class=\"col-md-12 text-center\">\n                            <button class='btn btn-danger' (click)=\"changePrivilegeValue(privilege)\"\n                            data-toggle=\"modal\" data-target=\"#privilegeModel\">Edit</button>\n                            <button class=\"btn btn-default\" (click)=\"deletePrivilegesValue(privilege.id)\">Delete</button>\n                        </div>\n                        <hr>\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n\n<!--\n    Model for privileges\n-->\n  <!-- Modal -->\n<div class=\"modal fade\" id=\"privilegeModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Update Privilege</h4>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n                <form [formGroup]='privilegeForm' (ngSubmit)=\"privilegeForm.valid && onPrivilegeUpdate(privilegeForm)\" >\n                    <div class=\"col-md-6 form-group\">\n                        <label>Module name: <span>{{privilege.module_type_name}}</span></label>\n                    </div>\n                    <div class=\"col-md-6 form-group\">\n                        <label>Module name: <span>{{privilege.role_name}}</span></label>\n                    </div>\n                    <div class=\"col-md-3 form-group\">\n                        <label>Create Rule: {{privilegeForm.value.create_rule}}</label>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"create_rule\" [checked]=\"privilege.create_rule == true\"   [value]=\"true\" formControlName=\"create_rule\">True</label>\n                        </div>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"create_rule\" [checked]=\"privilege.create_rule == false\"  [value]=\"false\" formControlName=\"create_rule\">False</label>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3 form-group\">\n                        <label>Update Rule: {{privilegeForm.value.update_rule}}</label>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"update_rule\" [checked]=\"privilege.update_rule == true\"  [value]=\"true\" formControlName=\"update_rule\">True</label>\n                        </div>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"update_rule\" [checked]=\"privilege.update_rule == false\" [value]=\"false\" formControlName=\"update_rule\">False</label>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3 form-group\">\n                        <label>Show Rule: {{privilegeForm.value.show_rule}}</label>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\"  name=\"show_rule\" [checked]=\"privilege.show_rule == true\" [value]=\"true\" formControlName=\"show_rule\">True</label>\n                        </div>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"show_rule\" [checked]=\"privilege.show_rule == false\" [value]=\"false\" formControlName=\"show_rule\">False</label>\n                        </div>\n                    </div>\n                    <div class=\"col-md-3 form-group\">\n                        <label>Delete Rule: {{privilegeForm.value.delete_rule}}</label>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"delete_rule\" [checked]=\"privilege.delete_rule == true\" [value]= true formControlName=\"delete_rule\">True</label>\n                        </div>\n                        <div class=\"radio\">\n                            <label><input type=\"radio\" name=\"delete_rule\" [checked]=\"privilege.delete_rule == false\" [value]=\"false\" formControlName=\"delete_rule\">False</label>\n                        </div>\n                    </div>\n                    <div class=\"col-md-12 text-center\">\n                        <button class=\"btn btn-default\" type=submit>Update</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        </div>\n        </div>\n    </div>\n</div>\n\n<!--model for create new privileges-->\n  <!-- Modal -->\n<div class=\"modal fade\" id=\"createPrivilegemodel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Create New Privilege</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"row\" *ngIf=\"showForm\">\n                    <form [formGroup]='privilegeForm' (ngSubmit)=\"onPrivilegeCreate(privilegeForm)\">\n                        <div class=\"col-md-4 form-group\">\n                            <label>Role Name</label>\n                            <div  *ngFor=\"let role of userDatas[0].roles\">\n                                <h4>{{role.name}}</h4>\n                                <input type=\"hidden\"  [ngModel]=\"role.id\" formControlName=\"role_id\" name=\"role_id\"/>\n                            </div>\n                            <div>\n                                <input type=\"hidden\"  [ngModel]=\"userDatas[0].user.id\" formControlName=\"user_id\" name=\"user_id\"/>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4 form-group\">\n                            <label>Select Module</label>\n                            <select class=\"form-control\" id=\"module_type_id\"\n                                        formControlName=\"module_type_id\">\n                                <option *ngFor=\"let module of modules\" [value]=\"module.id\">{{module.name}}</option>\n                                <!-- <option [value]=\"mentor\">mentor</option> -->\n                                <!-- <option [ngValue]=\"startup\">Startup User</option> -->\n                            </select>\n                        </div>\n                        <div class=\"col-md-4 form-group\">\n                            <label>Create Rule: {{privilegeForm.value.create_rule}}</label>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"create_rule\" [checked]=\"privilege.create_rule == true\"   [value]=\"true\" formControlName=\"create_rule\">True</label>\n                            </div>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"create_rule\" [checked]=\"privilege.create_rule == false\"  [value]=\"false\" formControlName=\"create_rule\">False</label>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4 form-group\">\n                            <label>Update Rule: {{privilegeForm.value.update_rule}}</label>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"update_rule\" [checked]=\"privilege.update_rule == true\"  [value]=\"true\" formControlName=\"update_rule\">True</label>\n                            </div>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"update_rule\" [checked]=\"privilege.update_rule == false\" [value]=\"false\" formControlName=\"update_rule\">False</label>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4 form-group\">\n                            <label>Show Rule: {{privilegeForm.value.show_rule}}</label>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\"  name=\"show_rule\" [checked]=\"privilege.show_rule == true\" [value]=\"true\" formControlName=\"show_rule\">True</label>\n                            </div>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"show_rule\" [checked]=\"privilege.show_rule == false\" [value]=\"false\" formControlName=\"show_rule\">False</label>\n                            </div>\n                        </div>\n                        <div class=\"col-md-4 form-group\">\n                            <label>Delete Rule: {{privilegeForm.value.delete_rule}}</label>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"delete_rule\" [checked]=\"privilege.delete_rule == true\" [value]= true formControlName=\"delete_rule\">True</label>\n                            </div>\n                            <div class=\"radio\">\n                                <label><input type=\"radio\" name=\"delete_rule\" [checked]=\"privilege.delete_rule == false\" [value]=\"false\" formControlName=\"delete_rule\">False</label>\n                            </div>\n                        </div>\n                        <div class=\"col-md-12 text-center\">\n                            <button class=\"btn btn-default\" type=submit>Create</button>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n     "

/***/ }),

/***/ "./src/app/sitedashboard/usercontroller/usercontroller.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sitedashboard/usercontroller/usercontroller.component.ts ***!
  \**************************************************************************/
/*! exports provided: UsercontrollerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsercontrollerComponent", function() { return UsercontrollerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var UsercontrollerComponent = /** @class */ (function () {
    function UsercontrollerComponent(route, location, apiService, cookieService, formBuilder) {
        this.route = route;
        this.location = location;
        this.apiService = apiService;
        this.cookieService = cookieService;
        this.formBuilder = formBuilder;
        this.userDatas = [];
        this.user = {};
        this.userOptions = [];
        this.showForm = false;
        this.roles = [];
        this.privileges = [];
        this.modules = [];
        this.privilege = {};
        this.privilegeForm = {};
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
        this.privilegeForm = this.formBuilder.group({
            id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            module_type_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            role_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            user_id: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            create_rule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            update_rule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            show_rule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            delete_rule: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]
        });
    }
    UsercontrollerComponent.prototype.ngOnInit = function () {
        this.getUserData();
    };
    UsercontrollerComponent.prototype.createUserForm = function () {
        this.user = this.formBuilder.group({
            user: this.formBuilder.group({
                first_name: this.userDatas[0].user.first_name,
                last_name: this.userDatas[0].user.last_name,
                email: this.userDatas[0].user.email,
                phone_number: this.userDatas[0].user.phone_number,
                user_type: this.userDatas[0].user.user_type
            }),
            role: this.formBuilder.group({
                role_id: ''
            })
        });
        this.userOptions = [
            { name: "Site user", value: "site" },
            { name: "Mentor user", value: "mentor" }
        ];
    };
    UsercontrollerComponent.prototype.getUserData = function () {
        var _this = this;
        var data = { "user_id": +this.route.snapshot.paramMap.get('id') };
        this.apiService.postDataWithToken('get-user-related-data', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data[0]);
            _this.userDatas = data;
            _this.privileges = data[0].privileges;
            _this.modules = data[0].modules;
            // this.user = data[0].user;
            _this.showForm = true;
            _this.createUserForm();
            _this.getRoles(_this.userDatas[0].user.user_type);
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    UsercontrollerComponent.prototype.getRoles = function (user_type_role) {
        var _this = this;
        var data = { user_role_type: user_type_role };
        this.apiService.postDataWithToken('get-roles-user-type', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.roles = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.onSubmit = function (user) {
        var _this = this;
        // console.log(this.user.value);
        var data = JSON.stringify(this.user.value);
        console.log(data);
        this.apiService.putDataWithToken('update-user-by-admin', data, this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.changePrivilegeValue = function (privilege) {
        this.privilege = privilege;
        this.privilegeForm.patchValue({
            id: privilege.id,
            module_type_id: privilege.module_type_id,
            role_id: privilege.role_id,
            user_id: privilege.user_id,
            create_rule: privilege.create_rule,
            update_rule: privilege.update_rule,
            show_rule: privilege.show_rule,
            delete_rule: privilege.delete_rule
        });
    };
    UsercontrollerComponent.prototype.onPrivilegeUpdate = function (privilege) {
        var _this = this;
        var data = { "user_role": this.privilegeForm.value };
        console.log(JSON.stringify(data));
        this.apiService.putDataWithToken('put-user-role', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
            $('#privilegeModel').modal('hide');
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsercontrollerComponent.prototype.onPrivilegeCreate = function (privilege) {
        var _this = this;
        var refData = this.privilegeForm.value;
        var data = { "user_role": {
                "user_id": refData.user_id, "role_id": refData.role_id, "module_type_id": refData.module_type_id,
                "create_rule": refData.create_rule, "update_rule": refData.update_rule, "show_rule": refData.show_rule,
                "delete_rule": refData.delete_rule
            } };
        console.log(JSON.stringify(data));
        this.apiService.postDataWithToken('create-user-role-by-admin', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.getUserData();
            $('#createPrivilegemodel').modal('hide');
        }, function (error) {
            console.error("couldn't post because", error);
            $('#createPrivilegemodel').modal('hide');
        });
    };
    UsercontrollerComponent.prototype.deletePrivilegesValue = function (privilege_id) {
        var _this = this;
        var data = { "id": privilege_id };
        var confirmPopup = confirm("Are you sure want to delete this privilege");
        console.log(confirmPopup);
        if (confirmPopup) {
            this.apiService.putDataWithToken('delete-user-role', JSON.stringify(data), this.auth)
                .subscribe(function (data) {
                console.log(data);
                _this.getUserData();
            }, function (error) { return console.error("couldn't post because", error); });
        }
        else {
            return;
        }
    };
    UsercontrollerComponent.prototype.deleteRole = function (user_id, role_id) {
        var _this = this;
        var data = { "user_id": user_id, role_id: role_id };
        var confirmPopup = confirm("Are you sure want to delete this role");
        if (confirmPopup) {
            this.apiService.postDataWithToken('delete-role-user-by-admin', JSON.stringify(data), this.auth)
                .subscribe(function (data) {
                // console.log(data);
                _this.getUserData();
                // $('#createPrivilegemodel').modal('hide');
            }, function (error) {
                console.error("couldn't post because", error);
                // $('#createPrivilegemodel').modal('hide');
            });
        }
        else {
            return;
        }
    };
    UsercontrollerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usercontroller',
            template: __webpack_require__(/*! ./usercontroller.component.html */ "./src/app/sitedashboard/usercontroller/usercontroller.component.html"),
            styles: [__webpack_require__(/*! ./usercontroller.component.css */ "./src/app/sitedashboard/usercontroller/usercontroller.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _api_communication_service__WEBPACK_IMPORTED_MODULE_3__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_4__["CookieService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]])
    ], UsercontrollerComponent);
    return UsercontrollerComponent;
}());



/***/ }),

/***/ "./src/app/sitedashboard/usermodule/usermodule.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/sitedashboard/usermodule/usermodule.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n.invalid-feedback{\n    color: red;\n    font-size: 8px;\n}\n.is-invalid{\n    border: 1px solid red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2l0ZWRhc2hib2FyZC91c2VybW9kdWxlL3VzZXJtb2R1bGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7Q0FDbEI7QUFDRDtJQUNJLFdBQVc7SUFDWCxlQUFlO0NBQ2xCO0FBQ0Q7SUFDSSxzQkFBc0I7Q0FDekIiLCJmaWxlIjoic3JjL2FwcC9zaXRlZGFzaGJvYXJkL3VzZXJtb2R1bGUvdXNlcm1vZHVsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hci10b3Age1xuICAgIG1hcmdpbi10b3A6IDglO1xufVxuLmludmFsaWQtZmVlZGJhY2t7XG4gICAgY29sb3I6IHJlZDtcbiAgICBmb250LXNpemU6IDhweDtcbn1cbi5pcy1pbnZhbGlke1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/sitedashboard/usermodule/usermodule.component.html":
/*!********************************************************************!*\
  !*** ./src/app/sitedashboard/usermodule/usermodule.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row mar-top\">\n    From usermodule component\n</div>\n<div class=\"row\">\n    <button button type=\"button\" class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#createUserModel\">Create new user</button>\n      <!-- Modal -->\n  <div class=\"modal fade\" id=\"createUserModel\" role=\"dialog\">\n    <div class=\"modal-dialog\">\n    \n      <!-- Modal content-->\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n          <h4 class=\"modal-title\">Create new user</h4>\n        </div>\n        <div class=\"modal-body\">\n          <div class=\"row\">\n              <form [formGroup]='user' (ngSubmit)=\"user.valid && onSubmit(user)\" >\n              <div formGroupName='user'>  \n                <div class=\"col-md-6 form-group\">\n                    <label for=\"user_type\">Slect user type</label>\n                    <select class=\"form-control\" id=\"user_type\"\n                             formControlName=\"user_type\"\n                             (change)=\"getRoles($event.target.value)\">\n                      <option *ngFor=\"let value of userOptions\" [value]=\"value.value\">{{value.name}}</option>\n                      <!-- <option [value]=\"mentor\">mentor</option> -->\n                      <!-- <option [ngValue]=\"startup\">Startup User</option> -->\n                    </select>\n                </div>\n                <div class=\"col-md-6 form-group\">\n                    <label for=\"first_name\">First name</label>\n                    <input class=\"form-control\" type=\"text\"\n                         id=\"first_name\" placeholder=\"First name\" \n                          name=\"first\" formControlName=\"first_name\"\n                         required />\n                </div>\n                <div class=\"col-md-6 form-group\">\n                        <label for=\"last_name\">Last name</label>\n                        <input class=\"form-control\" type=\"text\" id=\"last_name\" name=\"last\"\n                                placeholder=\"Last name\" formControlName=\"last_name\" required  />\n                </div>\n                <div class=\"col-md-6 form-group\">\n                        <label for=\"email\">Email id</label>\n                        <input class=\"form-control\" type=\"email\"\n                         id=\"email\" placeholder=\"Email\" name=\"mail\" formControlName=\"email\" required email />\n                </div>\n                <div class=\"col-md-6 form-group\">\n                        <label for=\"phone_number\">Phone number</label>\n                        <input class=\"form-control\" type=\"text\" id=\"phone_number\" name=\"number\"\n                         placeholder=\"Phone number\" formControlName=\"phone_number\"\n                         required minlength=\"10\" maxlength=\"15\"/>\n                </div>\n              </div>  \n                <div class=\"col-md-6 form-group\" formGroupName='role' *ngIf=\"isRolesAvailable\">\n                    <label for=\"user_type\">Select role</label>\n                    <select class=\"form-control\" id=\"role\"\n                                formControlName=\"role_id\">\n                        <option *ngFor=\"let role of roles\" [value]=\"role.id\">{{role.name}}</option>\n                        <!-- <option [value]=\"mentor\">mentor</option> -->\n                        <!-- <option [ngValue]=\"startup\">Startup User</option> -->\n                    </select>\n                </div>\n                <div class=\"col-md-12 text-center\">\n                        <button [disabled]= \"!user.valid\" class=\"btn btn-primary\">Submit</button>\n                </div>\n              </form>\n          </div>\n        </div>\n        <div class=\"modal-footer\">\n        </div>\n      </div>\n      \n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <h2>List of users</h2>\n  <div class=\"col-md-12\">\n  <table class=\"table table-bordered\">\n      <thead>\n        <tr>\n          <th>Name</th>\n          <th>Email</th>\n          <th>Contact no</th>\n          <th>User type</th>\n          <th>Roles</th>\n          <th>Action</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let user of all_users\">\n          <td>{{user.full_name}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.phone_number}}</td>\n          <td>{{user.user_type}}</td>\n          <td *ngIf=\"user.roles.length != 0\">\n            <p  *ngFor=\"let role of user.roles\"><span *ngIf=\"role.name\">{{role.name }}</span></p>\n          </td>\n          <td *ngIf=\"user.roles.length <= 0\">No roles</td>\n          <td>\n            <button routerLink=\"controller/{{user.id}}\">Show user</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/sitedashboard/usermodule/usermodule.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/sitedashboard/usermodule/usermodule.component.ts ***!
  \******************************************************************/
/*! exports provided: UsermoduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsermoduleComponent", function() { return UsermoduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _api_communication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api-communication.service */ "./src/app/api-communication.service.ts");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UsermoduleComponent = /** @class */ (function () {
    function UsermoduleComponent(formBuilder, apiService, cookieService) {
        this.formBuilder = formBuilder;
        this.apiService = apiService;
        this.cookieService = cookieService;
        this.user = {};
        this.userOptions = [];
        this.roles = [];
        this.isRolesAvailable = false;
        this.all_users = [];
        this.createUserForm();
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        }
        else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
    }
    UsermoduleComponent.prototype.ngOnInit = function () {
        this.getUsersList();
    };
    UsermoduleComponent.prototype.createUserForm = function () {
        this.user = this.formBuilder.group({
            user: this.formBuilder.group({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                user_type: ''
            }),
            role: this.formBuilder.group({
                role_id: ''
            })
        });
        this.userOptions = [
            { name: "Site user", value: "site" },
            { name: "Mentor user", value: "mentor" }
        ];
    };
    UsermoduleComponent.prototype.onSubmit = function (user) {
        // console.log(this.user.value);
        var data = JSON.stringify(this.user.value);
        this.apiService.postDataWithToken('create-user-by-admin', data, this.auth)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent.prototype.getRoles = function (user_type_role) {
        var _this = this;
        var data = { user_role_type: user_type_role };
        this.apiService.postDataWithToken('get-roles-user-type', JSON.stringify(data), this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.roles = data;
            if (data.length > 0)
                _this.isRolesAvailable = true;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent.prototype.getCookie = function (key) {
        return this.cookieService.get(key);
    };
    UsermoduleComponent.prototype.getUsersList = function () {
        var _this = this;
        this.apiService.getDataWithAuth('get-all-users', this.auth)
            .subscribe(function (data) {
            console.log(data);
            _this.all_users = data;
        }, function (error) { return console.error("couldn't post because", error); });
    };
    UsermoduleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usermodule',
            template: __webpack_require__(/*! ./usermodule.component.html */ "./src/app/sitedashboard/usermodule/usermodule.component.html"),
            styles: [__webpack_require__(/*! ./usermodule.component.css */ "./src/app/sitedashboard/usermodule/usermodule.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _api_communication_service__WEBPACK_IMPORTED_MODULE_2__["ApiCommunicationService"],
            ngx_cookie_service__WEBPACK_IMPORTED_MODULE_3__["CookieService"]])
    ], UsermoduleComponent);
    return UsermoduleComponent;
}());



/***/ }),

/***/ "./src/app/startupdashboard/startupdashboard.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/startupdashboard/startupdashboard.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mar-top {\n    margin-top: 8%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhcnR1cGRhc2hib2FyZC9zdGFydHVwZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxlQUFlO0NBQ2xCIiwiZmlsZSI6InNyYy9hcHAvc3RhcnR1cGRhc2hib2FyZC9zdGFydHVwZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWFyLXRvcCB7XG4gICAgbWFyZ2luLXRvcDogOCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/startupdashboard/startupdashboard.component.html":
/*!******************************************************************!*\
  !*** ./src/app/startupdashboard/startupdashboard.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p class=\"mar-top\">\n  startupdashboard works!\n</p>\n"

/***/ }),

/***/ "./src/app/startupdashboard/startupdashboard.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/startupdashboard/startupdashboard.component.ts ***!
  \****************************************************************/
/*! exports provided: StartupdashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartupdashboardComponent", function() { return StartupdashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StartupdashboardComponent = /** @class */ (function () {
    function StartupdashboardComponent() {
    }
    StartupdashboardComponent.prototype.ngOnInit = function () {
    };
    StartupdashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-startupdashboard',
            template: __webpack_require__(/*! ./startupdashboard.component.html */ "./src/app/startupdashboard/startupdashboard.component.html"),
            styles: [__webpack_require__(/*! ./startupdashboard.component.css */ "./src/app/startupdashboard/startupdashboard.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StartupdashboardComponent);
    return StartupdashboardComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/karthik/Desktop/cohort/frontend/cohort/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map