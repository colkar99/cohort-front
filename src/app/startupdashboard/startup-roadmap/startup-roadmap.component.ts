import { Component, OnInit } from '@angular/core';
import { sharingData } from '../../sharingdata'
import { ApiCommunicationService } from '../../api-communication.service'
import { CookieService } from 'ngx-cookie-service'
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any
@Component({
  selector: 'app-startup-roadmap',
  templateUrl: './startup-roadmap.component.html',
  styleUrls: ['./startup-roadmap.component.css']
})
export class StartupRoadmapComponent implements OnInit {
  startupprofile: any = {}
  authToken: any
  roadmapresponse: any = {}
  program: any = {}
  roadmap: any = {}
  montharray: Array<any> = []
  goals: any = {}
  milestoneindex: any
  metric: string
  description: string
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    public sharedata: sharingData) {
    this.startupprofile = this.sharedata.startupprofile
    this.authToken = this.getCookie("Authorization")
  }

  ngOnInit() {
    let url = "program/startup/get-program-road_map-for-startup"
    let params = { startup_profile_id: this.startupprofile.id };
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log("res", res)
      this.roadmapresponse = res;
      this.program = res.program
      this.roadmap = res.road_map
      if (this.roadmap != null) {
        let url = "program/startup/get-road_map-for-startup"
        let params = JSON.stringify({startup_profile_id:this.startupprofile.id,road_map_id:this.roadmap.id})
        this.apiCom.postDataWithToken(url,params,this.authToken).subscribe((res)=>{
          res;
          this.roadmap = res 
        })
      } else {

        let string: any
        let startdatemonth = new Date(this.program.application_start_date).getMonth();
        let enddatemonth = new Date(this.program.application_end_date).getMonth();
        for (let i = startdatemonth; i <= enddatemonth; i++) {
          string = this.monthStrings(i)
          if (this.roadmap == null) {
            this.roadmap = {}
            this.roadmap.milestones = []
            this.roadmap.milestones.push({ month: string })
          } else {
            this.roadmap.milestones.push({ month: string })
          }

        }
        console.log("months", this.montharray)
      }

    }, ((err: HttpErrorResponse) => {
      alert(err)
    }))
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
    this.roadmap.program_id = this.program.id
    this.roadmap.startup_profile_id = this.startupprofile.id
    let url = "program/startup/create-road-map";
    let params = JSON.stringify({ startup_profile_id: this.startupprofile.id, road_map: this.roadmap, milestones: milestone })
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
    let params = JSON.stringify({ startup_profile_id: this.startupprofile.id, road_map: { id: this.roadmap.id } })

    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      if (res) {
        alert("Roadmap Deleted Successfully")
        this.roadmap = null
        let string: any
        let startdatemonth = new Date(this.program.application_start_date).getMonth();
        let enddatemonth = new Date(this.program.application_end_date).getMonth();
        for (let i = startdatemonth; i <= enddatemonth; i++) {
          string = this.monthStrings(i)
          if (this.roadmap == null) {
            this.roadmap = {}
            this.roadmap.milestones = []
            this.roadmap.milestones.push({ month: string })
          } else {
            this.roadmap.milestones.push({ month: string })
          }

        }
      }
    })
  }


}
