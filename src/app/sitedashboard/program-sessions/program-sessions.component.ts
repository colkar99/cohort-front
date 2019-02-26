import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {SharedDataService} from '../../shared-data.service'
@Component({
  selector: 'app-program-sessions',
  templateUrl: './program-sessions.component.html',
  styleUrls: ['./program-sessions.component.css']
})
export class ProgramSessionsComponent implements OnInit {

  message: any
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
  unfilteredvalue: any = []
  filterfeild
  filtervalue

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedDataService: SharedDataService
    ) { }

    // newMessage() {
    //   this.sharedDataService.changeMessage('Hello World');
    // }  
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
    // this.sharedDataService.currentMessage.subscribe(message => {
    //   this.message = message;
    // })
    // this.newMessage();
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
      this.cookieService.set('program_id', id, 30, '/');
      let url = "program/get-session-by-program";
      this.apiCom.putDataWithToken(url, JSON.stringify(data), this.authToken)
        .subscribe(data => {
          debugger
          console.log(data);
          this.allStartups = data;
          this.unfilteredvalue = data
         // this.allStartups.sort((a, b) => { if (a.score < b.score) { return 1; } if (a.score > b.score) { return -1; } })
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
  
  filtervalues(value: string) {
    let item = value.toLowerCase()
    if (this.filterfeild != 'score') {
      this.allStartups = this.unfilteredvalue.filter((list) => list[this.filterfeild].toLowerCase().includes(item))
    } else if (value != "") {
      this.allStartups = this.unfilteredvalue.filter((list) => list.score == Number(value))
    } else {
      this.allStartups = this.unfilteredvalue
    }

  }
  resetprogram(){
    this.allStartups = this.unfilteredvalue
  }
  passValue(item){
    this.sharedDataService.changeMessage(item)
  }
}
