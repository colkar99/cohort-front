import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-startupcontrol',
  templateUrl: './startupcontrol.component.html',
  styleUrls: ['./startupcontrol.component.css']
})
export class StartupControlComponent implements OnInit {

  authToken: string;
  loggedIn: boolean;
  startup: any;
  appRespQues: any;
  startup_id: number;

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) {
                this.startup_id = +this.route.snapshot.paramMap.get('id');
               
               }

  getCookie(key: string){
    return this.cookieService.get(key);
  }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }  
    this.getStartupRegQues();
    this.getStartUp();
  }
  getStartUp(){
    let url = "program/startup-application-details";
    let data: {} = {startup_application_id: this.startup_id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => {
        console.log(data);
        this.startup = data.startup_application;
        debugger
    }, error => {
      debugger
        console.log(error)
    })

  }
  getStartupRegQues(){
    debugger
      let url: string = "get-program-question-response";
      let data: {} = {startup_registration_id: this.startup_id};
        this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
        .subscribe(data => {
            console.log(data);
            this.appRespQues = data;
            debugger
        }, error => {
          debugger
            console.log(data)
        })
  }
  submitAdminResponse(form:any){
    debugger
    let url = "admin-feedback-for-startup-response";
    let data = {application_questions_response: form.value};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data=>{
      console.log(data);
    },error=>{
      console.log(error);
    })
  }
  requestCurrentStateForm(id: number){
        debugger
    let url = "program/admin/request-current-form";
    let data = {startup_registration_id: id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => 
      {
        console.log(data);
      },
      error=> {
        console.log(error);
      });
  }
  sendReminderForCurrent(id: number){
    debugger
    let url = "gentle-reminder";
    let data = {startup_registration_id: id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => 
      {
        console.log(data);
      },
      error=> {
        console.log(error);
      });
  }
  // startupAccept(id: number){
  //   debugger
  //   let url = "startup-accept-by-admin";
  //   let data = {startup_registration_id: id};
  //   this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
  //   .subscribe(data => 
  //     {
  //       console.log(data);
  //     },
  //     error=> {
  //       console.log(error);
  //     });
  // }
  // startupReject(id: number){
  //   debugger
  //   let url = "startup-reject-by-admin";
  //   let data = {startup_registration_id: id};
  //   this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
  //   .subscribe(data => 
  //     {
  //       console.log(data);
  //     },
  //     error=> {
  //       console.log(error);
  //     })
  // }

  
}
