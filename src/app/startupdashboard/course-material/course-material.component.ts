import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service'
import { sharingData } from '../../sharingdata'
import { from } from 'rxjs';
@Component({
  selector: 'app-course-material',
  templateUrl: './course-material.component.html',
  styleUrls: ['./course-material.component.css']
})
export class CourseMaterialComponent implements OnInit {
  authToken: any
  loggedIn: any
  courses: any = {}
  arrayitems: Array<any> = []
  startupprofile: any = {}

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private shareddata: SharedDataService,
    private sharingdata: sharingData
  ) { }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  ngOnInit() {
    this.startupprofile = this.sharingdata.startupprofile
    console.log("startupvalue", this.startupprofile)
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }

    this.getAllCourses();
  }
  getAllCourses() {
    this.courses = this.sharingdata.course
  }
}
