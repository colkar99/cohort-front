import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service'
import {ApiCommunicationService} from '../api-communication.service'
import {CookieService} from 'ngx-cookie-service'
declare var $:any
@Component({
  selector: 'app-about-profile',
  templateUrl: './about-profile.component.html',
  styleUrls: ['./about-profile.component.css']
})
export class AboutProfileComponent implements OnInit {
  startupdata:any = {}
  hideshow:any = false
  roadmap:any = {}
  milestoneindex:any
  metric:any
  description:any
  authToken:any
  currentstateform:any ={}
  companylogo: any = "assets/avatar_2x.png"
  CompanyName: any = "PETRAS"
  Mentors: any = "Stanly,Selwyn"
  bio: any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns). Three Equal Columns Using Numbers. You can also use numbers to control the column width."
  currentstate:any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns)"
  constructor(private sharedservice:SharedDataService,
    private apiCom:ApiCommunicationService,
    private cookieService:CookieService) {
    this.sharedservice.currentMessage.subscribe((res)=>{res;this.startupdata = res;})
    console.log("startupdata",this.startupdata)
    if(this.startupdata.main_image.url != null){
      this.companylogo = this.apiCom.imgUrl + this.startupdata.main_image.url
    }
    this.roadmap = this.startupdata.road_map
    this.authToken = this.getCookie("Authorization")
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
      let params = JSON.stringify({startup_profile_id:this.startupdata.id,road_map_id:this.roadmap.id})
      this.apiCom.postDataWithToken(url,params,this.authToken).subscribe((res)=>{
        res;
        this.roadmap = res 
      })
    }
  }
  getCookie(key: string) {
    return this.cookieService.get(key)
  }


  monthStrings(value: any): any {
    let month: string
    if (value == 0) {
      month = "January"
    } else if (value == 1) {
      month = "February"
    } else if (value == 2) {
      month = "March"
    } else if (value == 3) {
      month = "April"
    } else if (value == 4) {
      month = "May"
    } else if (value == 5) {
      month = "June"
    } else if (value == 6) {
      month = "July"
    } else if (value == 7) {
      month = "August"
    } else if (value == 8) {
      month = "September"
    } else if (value == 9) {
      month = "October"
    } else if (value == 10) {
      month = "November"
    } else if (value == 11) {
      month = "December"
    }
    return month
  }

  openmapdetails() {
    $("#roadmpdetails").modal('show')
  }
  saveroadmap() {
    $("#roadmpdetails").modal('hide')
  }
  closeroadmap() {
    $("#roadmpdetails").modal('hide')
  }
  openmilestone(i) {
    $("#milestone").modal('show')
    this.milestoneindex = i;
    this.metric = this.roadmap.milestones[this.milestoneindex].metric;
    this.description = this.roadmap.milestones[this.milestoneindex].description
  }
  savemilestone() {
    $("#milestone").modal('hide')
    this.roadmap.milestones[this.milestoneindex].metric = this.metric
    this.roadmap.milestones[this.milestoneindex].description = this.description
  }
  closemilestone() {
    $("#milestone").modal('hide')
  }

  submitRoadmap() {
    console.log(this.roadmap);
    let milestone = Object.assign([], this.roadmap.milestones)
    this.roadmap.milestones = undefined
    this.roadmap.program_id = this.roadmap.program_id
    this.roadmap.startup_profile_id = this.startupdata.id
    let url = "program/startup/create-road-map";
    let params = JSON.stringify({ startup_profile_id: this.startupdata.id, road_map: this.roadmap, milestones: milestone })
    console.log("params", params)
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log(res);
      if (this.roadmap.id == (null || undefined)) {
        alert("Roadmap Saved Successfully")
      } else {
        alert("Road Map Updated Successfully")
      }
      this.roadmap = res;

    })
  }

  deleteroadmap() {
    let url = "program/startup/delete-road-map";
    let params = JSON.stringify({ startup_profile_id: this.startupdata.id, road_map: { id: this.roadmap.id } })

    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      if (res) {
        alert("Roadmap Deleted Successfully")
        this.roadmap = null
        this.hideshow = false
        
      }
    })
  }

}
