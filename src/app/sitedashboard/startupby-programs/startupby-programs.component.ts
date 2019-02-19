import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from '../../shared-data.service'
@Component({
  selector: 'app-startupby-programs',
  templateUrl: './startupby-programs.component.html',
  styleUrls: ['./startupby-programs.component.css']
})
export class StartupbyProgramsComponent implements OnInit {
  authToken: string;
  loggedIn: boolean;
  livePrograms: any;
  expPrograms: any
  public user_details: any[];
  allPrograms: any[];
  allStartups: any[];
  startup: any;
  appRespQues: any;
  showStartup: boolean = false;
  location_program_id: any;
  formrequestarray: Array<any> = []
  programselected
  filterfeild
  filtervalue
  unfilteredvalue: any = []
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.location_program_id = this.getCookie('program_id')
    console.log("location_program_id", this.location_program_id)
    if (this.authToken.length != 0) {
      debugger
      if (this.location_program_id.length != 0) {
        this.showStartups(this.location_program_id);
      }
    }

    this.getAllProgram();
  }
  getAllProgram() {
    this.apiCom.getDataWithoutAuth('get-list-of-programs')
      .subscribe(data => {
        //   this.allPrograms = data;
        this.livePrograms = data.all_programs.live;
        this.expPrograms = data.all_programs.exp;
        console.log(data);
        console.log(data.all_programs.live);
        console.log(data.all_programs.exp);
        this.setStatusForPrograms(data);
      }, error => {
        console.log(`The following error has been occured: ${error}`)

      })
  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  setStatusForPrograms(programs) {
    this.allPrograms = [];
    for (let data of programs.all_programs.live) {
      console.log(data);
      data["status"] = "Running"
      this.allPrograms.push(data)
    }
    for (let data of programs.all_programs.exp) {
      console.log(data);
      data["status"] = "Expired"
      this.allPrograms.push(data)
    }
    console.log(this.allPrograms);
    let pr_id = this.getCookie('program_id')
    this.programselected = pr_id
    if (pr_id != (null && undefined && 0)) {
      this.showStartups(pr_id);
    }

  }

  showStartups(id: any) {
    debugger
    let data = { "program_id": id };
    this.cookieService.set('program_id', id, 30, '/');
    let url = "startup/show-profiles-for-admin";
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        debugger
        console.log(data);
        this.allStartups = data;
        this.unfilteredvalue = data
        this.allStartups.sort((a, b) => { if (a.score < b.score) { return 1; } if (a.score > b.score) { return -1; } })
        console.log("this.allStartups" + this.allStartups)
        this.showStartup = true;
      }, error => {
        console.log(error);
      })

  }
  viewprofile(item) {
    console.log(item)
    this.sharedDataService.changeMessage(item);
    this.router.navigate(['admin/dashboard/about-profile'])
  }

  filtervalues(value: string) {
    let item = value.toLowerCase();
    if (this.filterfeild == 'score') {
      this.allStartups = this.unfilteredvalue.filter((list) => list.score == Number(value))

    } else if (this.filterfeild != 'startup_name') {
      this.allStartups = this.unfilteredvalue.filter((list) => list.startup_registration[this.filterfeild].toLowerCase().includes(item))
    } else if (value != "") {
      this.allStartups = this.unfilteredvalue.filter((list) => list[this.filterfeild].toLowerCase().includes(item))

    } else {
      this.allStartups = this.unfilteredvalue
    }

  }

  resetprogram(){
    this.allStartups = this.unfilteredvalue
  }

}
