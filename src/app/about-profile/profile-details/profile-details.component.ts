import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../../shared-data.service'
import {ApiCommunicationService} from '../../api-communication.service'
import {CookieService} from 'ngx-cookie-service'
import {sharingData} from '../../sharingdata'
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  startupdata:any = {}
  slidervalue:any = 0
  startup:any = {}
  authToken:any
  currentstateform:any ={}
  roadmap: any = {}
  courses:any = []
  arrayitems:any = []
  constructor(private sharedservice:SharedDataService,
    private apiCom:ApiCommunicationService,
    private cookieService:CookieService,
    private sharingdata:sharingData) {
    this.sharedservice.currentMessage.subscribe((res)=>{res;this.startupdata = res;
      this.startup = res.startup_registration
    if(this.startupdata.current_status.status == "SPC"){
      this.slidervalue = 25
    }else if(this.startupdata.current_status.status == "RMD"){
      this.slidervalue = 40
    }
    else if(this.startupdata.current_status.status == "VDC"){
      this.slidervalue = 70
    }
    else if(this.startupdata.current_status.status == "RMD"){
      this.slidervalue = 100
    }
    })
    console.log("startupdata",this.startupdata)
    
    this.authToken = this.getCookie("Authorization")
    this.roadmap = this.startupdata.road_map
   }

  ngOnInit() {
    let url = "program/user/show-current-state-form"
    let params = {current_state_form:{program_id:this.startupdata.startup_registration.program_id,startup_registration_id:this.startupdata.startup_registration.id}}
    this.apiCom.postDataWithToken(url,JSON.stringify(params),this.authToken).subscribe((res)=>{
      res;
      this.currentstateform = res
    })

    if (this.roadmap != (null && undefined)) {
      let url = "program/startup/get-road_map-for-startup-admin"
      let params = JSON.stringify({ startup_profile_id: this.startupdata.id, road_map_id: this.roadmap.id })
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        this.roadmap = res;
        console.log(this.roadmap);
      })
    }
    this.getAllCourses();
    
  }
  getCookie(key: string) {
    return this.cookieService.get(key)
  }

  getAllCourses() {
    let url = "framework/course/get-assigned-courses"
    let params = JSON.stringify({startup_profile_id:this.startupdata.id})
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
      let params = JSON.stringify({ courses: this.arrayitems, program_id: this.startupdata.startup_registration.program_id, startup_profile_id: this.startupdata.id,singular:true })
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
    let params = JSON.stringify({startup_profile_id:this.startupdata.id,course_id:course.id})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      console.log("resremainder",res)
      alert("Remainder Sent Successfully")
    })
  }


  


}
