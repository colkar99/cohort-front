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

  roadmapMonth: number;
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
  milestoneid: any
  resources: any = {}
  kpigoal: any
  kpidescription: any
  kpimetric: any
  mileindex: any = -1
  roadedit: boolean = true;
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    public sharedata: sharingData) {
    this.startupprofile = this.sharedata.startupprofile
    this.authToken = this.getCookie("Authorization")
  }

  ngOnInit() {
    this.roadmapMonth = 5000;
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
        let params = JSON.stringify({ startup_profile_id: this.startupprofile.id, road_map_id: this.roadmap.id })
        this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
          res;
          this.roadmap = res
          this.maingoal(5000);
        })
      } else {
        this.roadedit = false
        let string: any
        let startdatemonth = new Date(this.program.start_date).getMonth();
        let enddatemonth = new Date(this.program.end_date).getMonth();
        for (let i = startdatemonth; i <= enddatemonth; i++) {
          string = this.monthStrings(i)
          if (this.roadmap == null) {
            this.roadmap = {}
            this.roadmap.milestones = []
            this.roadmap.milestones.push({ month: string })
          } else {
            this.roadmap.milestones.push({ month: string })
          }
          this.maingoal(5000);
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
      this.roadedit = true;
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
        let startdatemonth = new Date(this.program.start_date).getMonth();
        let enddatemonth = new Date(this.program.end_date).getMonth();
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
  openresource() {
    if (this.roadmap.id != null && this.roadmap.id != undefined) {
      let item = this.roadmap.milestones[this.mileindex]
      this.milestoneid = item.id
      let url = "program/startup/request-resource-get"
      let params = JSON.stringify({ milestone_id: this.milestoneid })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        if (res.length > 0) {
          this.resources = res[0]
        } else {
          this.resources = {}
        }
        console.log(res)
        $("#resourcesneeded").modal('show')
      })
    } else {
      alert("Save Roadmap to Enter the Resource Needed")
    }

  }

  saveresource() {
    let url: string
    let params: any
    this.resources.road_map_id = this.roadmap.id;
    this.resources.startup_profile_id = this.startupprofile.id
    if (this.resources.id == (null && undefined)) {
      url = "program/startup/request-resource";
      params = JSON.stringify({ resource: this.resources, milestone_id: this.milestoneid })
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log(res);
        alert("Resource Created Successfully")
        $("#resourcesneeded").modal('hide')
      })

    } else {
      url = "program/startup/request-resource-edit"
      params = JSON.stringify({ resource: this.resources })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log(res);
        alert("Resource Updated Successfully")
        $("#resourcesneeded").modal('hide')
      })
    }

  }
  closeresource() {
    $("#resourcesneeded").modal('hide')
  }
  maingoal(val) {
    this.roadmapMonth =  val;
    console.log(this.roadmapMonth);
    if(this.mileindex != -1){
      this.roadmap.milestones[this.mileindex].name = this.kpigoal
      this.roadmap.milestones[this.mileindex].metric = this.kpimetric
      this.roadmap.milestones[this.mileindex].description = this.kpidescription
    }
    this.mileindex = -1
      this.kpidescription = this.roadmap.description
      this.kpimetric = this.roadmap.strategy
      this.kpigoal = this.roadmap.goal
  }
  milegoal(item, i) {
    this.roadmapMonth =  i;
    if (this.mileindex == -1) {
      this.roadmap.goal = this.kpigoal
      this.roadmap.strategy = this.kpimetric
      this.roadmap.description = this.kpidescription

      this.mileindex = i
      this.kpidescription = item.description
      this.kpimetric = item.metric
      this.kpigoal = item.name
    }
    else if(this.mileindex == undefined){
      this.mileindex = i
      this.kpidescription = item.description
      this.kpimetric = item.metric
      this.kpigoal = item.name
    }
    else {
      this.roadmap.milestones[this.mileindex].name = this.kpigoal
      this.roadmap.milestones[this.mileindex].metric = this.kpimetric
      this.roadmap.milestones[this.mileindex].description = this.kpidescription

      this.mileindex = i
      this.kpidescription = item.description
      this.kpimetric = item.metric
      this.kpigoal = item.name
      
      

    }

  }


}
