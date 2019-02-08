import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {

  private  url = "http://localhost:3000/v1/";
  // public url = "http://ec2-54-172-0-213.compute-1.amazonaws.com/v1/";
  public imgUrl = "http://ec2-54-172-0-213.compute-1.amazonaws.com"
  domainUrl: string;
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
  };

  private _headers = new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*');



  postData(url: string,params): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    this.spinnerservice.show()
    return this.http.post(this.domainUrl,params,this.httpOptions)
    .pipe(
      map((res) =>{res;this.spinnerservice.hide();return res;})).pipe(
      catchError((error:any)=>{this.spinnerservice.hide();return throwError(error.error.message)})
      
    );
  };

  postDataWithToken(url: string,params: {},auth: string): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    let headers = this._headers.append('Authorization', auth);
    debugger
    return this.http.post<any>(this.domainUrl,params,{headers: headers})
    .pipe(
      catchError(this.handleError)
    );
  };
  putDataWithToken(url: string,params: {},auth: string): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    let headers = this._headers.append('Authorization', auth);
    debugger
    return this.http.put<any>(this.domainUrl,params,{headers: headers})
    .pipe(
      catchError(this.handleError)
    );
  };
  putDataWithoutToken(url: string,params: {}): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
   
    debugger
    return this.http.put<any>(this.domainUrl,params,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }; 

  getDataWithAuth(url: string,auth: string): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    // this.httpOptions.headers.append('Authorization', 'asdasdasd');
    let headers = this._headers.append('Authorization', auth);
    return this.http.get<any>(this.domainUrl,{headers: headers})
    .pipe(
      catchError(this.handleError)
    );
  };
  getDataWithoutAuth(url: string): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    return this.http.get<any>(this.domainUrl)
    .pipe(
      catchError(this.handleError)
    );
  };

  postDataCFSI(url: string,id): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    let params = {"startup_application_id": id}
    return this.http.post<any>(this.domainUrl,params,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  };

  submitCurrentStateForm(url: string,values): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    let params = JSON.stringify(values)
    return this.http.post<any>(this.domainUrl,params,this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  };

  bulkCFSIrequest(url,params,auth){
    this.domainUrl = `${this.url}${url}`;
    this.spinnerservice.show()
    console.log(params)
    let headers = this._headers.append('Authorization', auth);
    return this.http.post(this.domainUrl,params,{headers:headers})
    .pipe(
      map((res) =>{res;this.spinnerservice.hide();return res;})).pipe(
      catchError((error:any)=>{this.spinnerservice.hide();return throwError(error.error.message)})
      
    );
  }

  CSFSsubmit(url,params,auth){
    this.domainUrl = `${this.url}${url}`;
    this.spinnerservice.show()
    console.log(params)
    let headers = this._headers.append('Authorization', auth);
    return this.http.put(this.domainUrl,params,{headers:headers})
    .pipe(
      map((res) =>{res;this.spinnerservice.hide();return res;})).pipe(
      catchError((error:any)=>{this.spinnerservice.hide();return throwError(error.error.message)})
      
    );
  }

  // getDate(url){
  //   this.domainUrl = `${this.url}${url}`;
  //   return this.http.get<any>(this.domainUrl)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occured:" , error.error.message)
    } else {
      console.error(`Backend returned error:${error.status}` + `body was:${error}`)
    }
   
    return throwError(error.error.message)
  }
  constructor(private http: HttpClient,private spinnerservice:Ng4LoadingSpinnerService) { }
}
