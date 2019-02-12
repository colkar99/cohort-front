import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-programcontrol',
  templateUrl: './programcontrol.component.html',
  styleUrls: ['./programcontrol.component.css']
})
export class ProgramControlComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
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

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router) { }

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
    this.location_program_id = this.getCookie('program_id')
    console.log("location_program_id", this.location_program_id)
    if (this.authToken.length != 0) {
      debugger
      if (this.location_program_id.length != 0) {
        this.showStartups(this.location_program_id);
      }
    }
    this.getUserDetails();
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
    if (id != "" && id != (0 && null && undefined)) {
      let data = { "program_id": id };
      this.cookieService.set('program_id', id, 30, '/admin/dashboard/program-controls');
      let url = "program/show-startup-program-wise";
      this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
        .subscribe(data => {
          debugger
          console.log(data);
          this.allStartups = data;
          this.allStartups.sort((a, b) => { if (a.score < b.score) { return 1; } if (a.score > b.score) { return -1; } })
          console.log("this.allStartups" + this.allStartups)
          this.showStartup = true;
        }, error => {
          console.log(error);
        })
    }


  }
  getStartupRegQues(startup_id: number, program_id: number, startup: any) {
    debugger
    this.startup = startup;
    let url: string = "get-program-question-response";
    let data: {} = { startup_registration_id: startup_id, program_id: program_id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.appRespQues = data
        debugger
      }, error => {
        console.log(data)
      })
  }
  submitAdminResponse(form: any) {
    debugger
  }
  setarray(checked, item) {
    if (checked == true) {
      this.formrequestarray.push(item.id)
      console.log("reqarray", this.formrequestarray)
    } else {
      if (checked == false) {
        let deleteindex = this.formrequestarray.indexOf(item.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.formrequestarray.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.formrequestarray)
        }
      }
    }
  }

  initiatecsfi() {
    if (this.formrequestarray.length > 0) {
      let proceed: boolean
      for (let i = 0; i <= this.formrequestarray.length; i++) {
        for (let j = 0; j < this.allStartups.length; j++) {
          if (this.allStartups[j].id == this.formrequestarray[i]) {
            if (this.allStartups[j].application_status != "RC") {
              proceed = true
            } else {
              if (proceed == true) {

              } else {
                proceed = false
              }
            }
          }
        }
      }
      if (proceed == true) {
        alert("Startup status with RC can be Initiate the Current State Form")
      } else {
        let url = "program/admin/request-current-form";
        let params = JSON.stringify({ "startup_app_ids": this.formrequestarray });
        this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
          res;
          let id = this.getCookie("program_id");
          this.showStartups(id);
          this.formrequestarray = []
          alert("Current State Form Initiated");
        }, (err: HttpErrorResponse) => {
          alert(err)
        })
      }

    } else {
      alert("Select atleast One Startup Company")
    }

  }
  startupAccept() {
    debugger
    if (this.formrequestarray.length > 0) {
      let proceed: boolean
      for (let i = 0; i <= this.formrequestarray.length; i++) {
        for (let j = 0; j < this.allStartups.length; j++) {
          if (this.allStartups[j].id == this.formrequestarray[i]) {
            if (this.allStartups[j].application_status != "CSFR") {
              proceed = true
            } else {
              if (proceed == true) {

              } else {
                proceed = false
              }
            }
          }
        }
      }
      if (proceed == true) {
        alert("Startup status with CSFR can be Accepted")
      } else {
        let url = "startup-accept-by-admin-bulk";
        let data = { startup_app_ids: this.formrequestarray };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
          .subscribe(data => {
            console.log("acceptdata" + data);
            let id = this.getCookie("program_id");
            alert("Startups Accepted Successfully")
            this.showStartups(id);
            this.formrequestarray = []
          },
            error => {
              console.log(error);
            });
      }


    } else {
      alert("Select atleast One Startup Company")
    }
  }
  startupReject() {
    debugger
    if (this.formrequestarray.length > 0) {
      let proceed: boolean
      for (let i = 0; i <= this.formrequestarray.length; i++) {
        for (let j = 0; j < this.allStartups.length; j++) {
          if (this.allStartups[j].id == this.formrequestarray[i]) {
            if (this.allStartups[j].application_status != "CSFR") {
              proceed = true
            } else {
              if (proceed == true) {

              } else {
                proceed = false
              }
            }
          }
        }
      }
      if (proceed == true) {
        alert("Startup status with CSFR can be Rejected")
      } else {
        let url = "startup-reject-by-admin-bulk";
        let data = { startup_app_ids: this.formrequestarray };
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
          .subscribe(data => {
            let id = this.getCookie("program_id");
            alert("Startups Rejected Successfully")
            this.showStartups(id);
            this.formrequestarray = []
            console.log("rejectdata" + data);
          },
            error => {
              console.log(error);
            })
      }

    } else {
      alert("Select atleast One Startup Company")
    }
  }

}
