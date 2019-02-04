var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { map } from 'rxjs/operators';
var ApiCommunicationService = /** @class */ (function () {
    function ApiCommunicationService(http, spinnerservice) {
        this.http = http;
        this.spinnerservice = spinnerservice;
        // private  url = "http://localhost:3000/v1/";
        this.url = "http://ec2-54-172-0-213.compute-1.amazonaws.com/v1/";
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        this._headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*');
    }
    ApiCommunicationService.prototype.postData = function (url, params) {
        var _this = this;
        this.domainUrl = "" + this.url + url;
        this.spinnerservice.show();
        return this.http.post(this.domainUrl, params, this.httpOptions)
            .pipe(map(function (res) { res; _this.spinnerservice.hide(); return res; })).pipe(catchError(function (error) { _this.spinnerservice.hide(); return throwError(error.error.message); }));
    };
    ;
    ApiCommunicationService.prototype.postDataWithToken = function (url, params, auth) {
        this.domainUrl = "" + this.url + url;
        var headers = this._headers.append('Authorization', auth);
        debugger;
        return this.http.post(this.domainUrl, params, { headers: headers })
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.putDataWithToken = function (url, params, auth) {
        this.domainUrl = "" + this.url + url;
        var headers = this._headers.append('Authorization', auth);
        debugger;
        return this.http.put(this.domainUrl, params, { headers: headers })
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.putDataWithoutToken = function (url, params) {
        this.domainUrl = "" + this.url + url;
        debugger;
        return this.http.put(this.domainUrl, params, this.httpOptions)
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.getDataWithAuth = function (url, auth) {
        this.domainUrl = "" + this.url + url;
        // this.httpOptions.headers.append('Authorization', 'asdasdasd');
        var headers = this._headers.append('Authorization', auth);
        return this.http.get(this.domainUrl, { headers: headers })
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.getDataWithoutAuth = function (url) {
        this.domainUrl = "" + this.url + url;
        return this.http.get(this.domainUrl)
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.postDataCFSI = function (url, id) {
        this.domainUrl = "" + this.url + url;
        var params = { "startup_application_id": id };
        return this.http.post(this.domainUrl, params, this.httpOptions)
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.submitCurrentStateForm = function (url, values) {
        this.domainUrl = "" + this.url + url;
        var params = JSON.stringify(values);
        return this.http.post(this.domainUrl, params, this.httpOptions)
            .pipe(catchError(this.handleError));
    };
    ;
    ApiCommunicationService.prototype.bulkCFSIrequest = function (url, params, auth) {
        var _this = this;
        this.domainUrl = "" + this.url + url;
        this.spinnerservice.show();
        console.log(params);
        var headers = this._headers.append('Authorization', auth);
        return this.http.post(this.domainUrl, params, { headers: headers })
            .pipe(map(function (res) { res; _this.spinnerservice.hide(); return res; })).pipe(catchError(function (error) { _this.spinnerservice.hide(); return throwError(error.error.message); }));
    };
    ApiCommunicationService.prototype.CSFSsubmit = function (url, params, auth) {
        var _this = this;
        this.domainUrl = "" + this.url + url;
        this.spinnerservice.show();
        console.log(params);
        var headers = this._headers.append('Authorization', auth);
        return this.http.put(this.domainUrl, params, { headers: headers })
            .pipe(map(function (res) { res; _this.spinnerservice.hide(); return res; })).pipe(catchError(function (error) { _this.spinnerservice.hide(); return throwError(error.error.message); }));
    };
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
        return throwError(error.error.message);
    };
    ApiCommunicationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, Ng4LoadingSpinnerService])
    ], ApiCommunicationService);
    return ApiCommunicationService;
}());
export { ApiCommunicationService };
//# sourceMappingURL=api-communication.service.js.map