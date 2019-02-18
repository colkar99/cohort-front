import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service'

@Component({
  selector: 'app-sitedashboard-framework-module',
  templateUrl: './framework-module.component.html',
  styleUrls: ['./framework-module.component.css']
})
export class FrameworkModuleComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  frameworks: any = [];
  courses: any
  framwork_unfiltered: any = [];
  course_unfiltered: any = []
  filterfeild: any
  filterfeild1: any;
  filtervalue1: any
  filtervalue: any


  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private shareddata: SharedDataService) { }

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
        this.framwork_unfiltered = data;
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
        this.course_unfiltered = data;
      }, error => {
        console.log(error);
      })
  }
  setsourceedit(course) {
    this.shareddata.changeMessage(course)
  }

  filtervalues(value: string) {
    let item = value.toLowerCase()
    if (this.filterfeild != 'level') {
      this.frameworks = this.framwork_unfiltered.filter((list) => list[this.filterfeild].toLowerCase().includes(item))
    } else if (value != "") {
      this.frameworks = this.framwork_unfiltered.filter((list) => list.level == Number(value))
    } else {
      this.frameworks = this.framwork_unfiltered
    }

  }
  filtervalues1(value: string) {
    if (value != "") {
      this.courses = this.course_unfiltered.filter((list) => list[this.filterfeild1].toLowerCase().includes(value.toLowerCase()))
    } else {
      this.courses = this.course_unfiltered
    }



  }
  resetframe() {
    this.frameworks = this.framwork_unfiltered
  }
  resetcourse() {
    this.courses = this.course_unfiltered
  }
}
