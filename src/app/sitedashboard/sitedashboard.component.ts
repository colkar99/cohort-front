import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sitedashboard',
  templateUrl: './sitedashboard.component.html',
  styleUrls: ['./sitedashboard.component.css']
})
export class SitedashboardComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router) { }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  
  getUserDetails(){
    this.apiCom.getDataWithAuth(this.getUserUrl,this.authToken)
    .subscribe(
      data => { 
         if(data.roles[0].user_role_type != 'site'){
          this.logout();
         }
        console.log("success!", data);
        this.user_details = data;
        // if(this.user_details.role[0].user_role_type){}
    }, 
      error => console.error("couldn't post because", error)
    );
  }
  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.getUserDetails();  
  }

  logout(): void {
    this.deleteCookie('Authorization');
    this.deleteCookie('role');
    this.deleteCookie('user_type');
    this.deleteCookie('user_id');
    this.loggedIn = false;
    // this.detect.detectChanges();
    this.router.navigate(['/']);
  }

  deleteCookie(key: string) {
    debugger
    return this.cookieService.deleteAll('/');
  }
}
