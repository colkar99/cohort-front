import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service'
import { sharingData } from '../../sharingdata'
import { from } from 'rxjs';
@Component({
  selector: 'app-assign-activities',
  templateUrl: './assign-activities.component.html',
  styleUrls: ['./assign-activities.component.css']
})
export class AssignActivitiesComponent implements OnInit {
  authToken: any
  loggedIn: any
  courses: any = []
  arrayitems: Array<any> = []
  startupprofile: any = {}
  date:Array<boolean> = [];
  activity_response:Array<boolean> = []

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
    this.shareddata.currentMessage.subscribe((res) => this.startupprofile = res)
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
    let url = "framework/course/get-assigned-courses"
    let params = JSON.stringify({startup_profile_id:this.startupprofile.id})
    this.apiCom.putDataWithToken(url,params, this.authToken)
      .subscribe(data => {
        console.log("courses1", data);
        this.courses = data;
        let date = new Date();
        console.log( new Date().toISOString().slice(0, 10) >=this.courses[1].target_date )
        debugger
        
       
        for(let i = 0;i<this.courses.length;i++){
          if( new Date().toISOString().slice(0, 10) >=this.courses[i].target_date){
            this.courses[i].ex_date = true;
          }else{
            this.courses[i].ex_date = false;
          }
          if(this.courses[i].course_passed == true && this.courses[i].is_assigned == true){
            this.courses[i].color = "#d2efd2"
          }else if(this.courses[i].course_passed == false && this.courses[i].is_assigned == true){
            this.courses[i].color = "#f1ccd1"
          }else{
            this.courses[i].color = "gainsboro"
          }
          this.courses[i].all_activity_responsed = false
          for(let j =0;j< this.courses[i].activities.length;j++){
            if(this.courses[i].activities[j].startup_responsed == false){
              this.courses[i].all_activity_responsed = true;
            }
            console.log("this.courses[i].all_activity_responsed ",this.courses[i].all_activity_responsed )
          }
          
          
        }

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

  sendRemainder(course){
    let url = "framework/course/send-reminder"
    let params = JSON.stringify({startup_profile_id:this.startupprofile.id,course_id:course.id})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("resremainder",res)
      alert("Remainder Sent Successfully")
    })
  }

}
