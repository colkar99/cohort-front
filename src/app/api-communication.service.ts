import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {

  private  url = "http://localhost:3000/v1/";
  domainUrl: string;
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'})
  };

  private _headers = new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*');



  postData(url: string,params: {}): Observable<any>{
    this.domainUrl = `${this.url}${url}`;
    return this.http.post<any>(this.domainUrl,params,this.httpOptions)
    .pipe(
      catchError(this.handleError)
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
    return throwError('Something happened please try agin later')
  }
  constructor(private http: HttpClient) { }
}
