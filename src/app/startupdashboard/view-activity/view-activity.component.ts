import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service'
import { sharingData } from '../../sharingdata'
import { from } from 'rxjs';
@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent implements OnInit {
  authToken: any
  loggedIn: any
  courses: any = []
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
    let url = "framework/course/get-assigned-courses-for-startup"
    let params = JSON.stringify({startup_profile_id:this.startupprofile.id})
    this.apiCom.putDataWithToken(url,params, this.authToken)
      .subscribe(data => {
        console.log("courses", data);
        this.courses = data;

      }, error => {
        console.log(error);
      })
  }
  setvalues(checked, item) {
    if (checked == true) {
      this.arrayitems.push(item)
    } else {
      if (checked == false) {

        let deleteindex = this.arrayitems.findIndex(x => x.id == item.id)
        debugger
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayitems.splice(deleteindex, 1)
          console.log("this.arrayitems", this.arrayitems)
        }
      }
    }
  }
  assigncourses() {
    if (this.arrayitems.length > 0) {
     
      let url = "framework/course/assign_activities_to_startup"
      let params = JSON.stringify({ courses: this.arrayitems, program_id: this.startupprofile.startup_registration.program_id, startup_profile_id: this.startupprofile.id })
      console.log(params)
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log("assignres", res);
        alert("Courses Assigned Successfully")
        this.getAllCourses();
      })
    }
    else {
      alert("Select atleast one Course Activities to Assign Courses to Startups")
    }
  }
  viewMaterials(course) {
    this.sharingdata.course = course
    this.sharingdata.assign_view = false
  }


}
