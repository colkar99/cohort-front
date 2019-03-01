import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../shared-data.service'
import { sharingData } from '../../sharingdata'
import { from } from 'rxjs';
@Component({
  selector: 'app-view-materials',
  templateUrl: './view-materials.component.html',
  styleUrls: ['./view-materials.component.css']
})
export class ViewMaterialsComponent implements OnInit {
  authToken: any
  loggedIn: any
  courses: any = {}
  arrayitems: Array<any> = []
  startupprofile: any = {}
  formarray

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
   this.shareddata.currentMessage.subscribe((res)=>{this.startupprofile = res;console.log("profile",this.startupprofile)})
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
  submitact(activity){
    let url = "framework/course/admin-response-for-activity"
    let params= {startup_profile_id: this.startupprofile.id,activity_id: activity.id,course_id: this.courses.id,admin_feedback: activity.admin_feedback}
    this.apiCom.putDataWithToken(url,JSON.stringify(params),this.authToken).subscribe((res)=>{
      res;
      console.log(res)
      alert("response submitted")
      activity.admin_responsed = true
    })
  }
  changepass(checked,value){
    if(checked == true){
      value.is_passed = true
    }else{
      value.is_passed = false
    }
  }
  submitchecks(){
    let url = "framework/course/admin-response-for-checklists"
    let params = {startup_profile_id: this.startupprofile.id,course_id:this.courses.id ,checklists: this.courses.checklists}
    this.apiCom.putDataWithToken(url,JSON.stringify(params),this.authToken).subscribe((res)=>{
      res;
      console.log("response",res);
      alert("Checklists Updated Successfully")
    })
  
  }


}
