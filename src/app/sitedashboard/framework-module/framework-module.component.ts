import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {SharedDataService} from '../../shared-data.service'

@Component({
  selector: 'app-sitedashboard-framework-module',
  templateUrl: './framework-module.component.html',
  styleUrls: ['./framework-module.component.css']
})
export class FrameworkModuleComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  frameworks: any;
  courses:any
  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private shareddata:SharedDataService) { }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  getUserDetails() {
    this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
      .subscribe(
        data => {
          console.log("success!", data);
          this.user_details = data;
        },
        error => console.error("couldn't post because", error)
      );
  }
  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.getUserDetails();
    this.getAllFrameWorks();
    this.getAllCourses();
  }
  getAllFrameWorks() {
    let url = "program/show-all-framworks";
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        console.log(data);
        this.frameworks = data;
      }, error => {
        console.log(error);
      })

  }
  getAllCourses() {
    let url = "framework/course/view-all"
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        console.log(data);
        this.courses = data;
      }, error => {
        console.log(error);
      })
  }
  setsourceedit(course){
    this.shareddata.changeMessage(course)
  }
}
