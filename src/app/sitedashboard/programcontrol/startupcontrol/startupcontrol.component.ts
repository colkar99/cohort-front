import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CurrentstateFormVO } from '../../../CurrentStateFormVO'

@Component({
  selector: 'app-startupcontrol',
  templateUrl: './startupcontrol.component.html',
  styleUrls: ['./startupcontrol.component.css']
})
export class StartupControlComponent implements OnInit {

  response: any;
  authToken: string;
  loggedIn: boolean;
  startup: any = {};
  appRespQues: any;
  startup_id: number;
  currentstateform: CurrentstateFormVO
  currentstateedit:boolean = true

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) {
    this.startup_id = +this.route.snapshot.paramMap.get('id');
    this.currentstateform = new CurrentstateFormVO()

  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.getStartupRegQues();
    this.getStartUp();
  }
  getStartUp() {
    let url = "program/startup-application-details";
    let data: {} = { startup_application_id: this.startup_id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.startup = data.startup_application;
        if(this.startup.current_state_form_reviewed == false){
          this.currentstateedit = false
        }else{
         this.currentstateedit = true
        }
        if (this.startup.application_status != "PR" && this.startup.application_status != "RP" && this.startup.application_status != "RC" && this.startup.application_status != "CSFI") {
          let url = "program/user/show-current-state-form";
          let params = {
            "current_state_form": {
              "program_id": this.startup.program_id,
              "startup_registration_id": this.startup_id
            }
          }
          this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res: any) => {
            res;
            this.currentstateform = res;
            console.log(this.currentstateform)
          }, (err) => {
            alert(err)
          })
        }
        debugger
      }, error => {
        debugger
        console.log(error)
      })

  }
  getStartupRegQues() {
    debugger
    let url: string = "get-program-question-response";
    let data: {} = { startup_registration_id: this.startup_id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.appRespQues = data;
      }, error => {
        console.log(data)
      })
  }
  submitAdminResponse(form: any) {
    let url = "admin-feedback-for-startup-response";
    let data = { application_questions_response: form.value };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.getStartupRegQues();
        this.appRespQues 
        if(this.currentstateform.reviewer_rating != "" && this.currentstateform.reviewer_rating != (0 && null && undefined)){
          this.submitCSFS();
          console.log("submitscfs")
        }
      }, error => {
        console.log(error);
      })
  }
  requestCurrentStateForm(id: number) {
    let url = "program/admin/request-current-form";
    let data = { startup_registration_id: id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }
  sendReminderForCurrent(id: number) {
    let url = "gentle-reminder";
    let data = { startup_registration_id: id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }
  submitCSFS() {
    if (this.currentstateform.reviewer_rating != "" && this.currentstateform.reviewer_rating != (null && undefined)) {
      let total = 0;
      this.currentstateform.total_rating = 0;
      for (let i = 0; i < this.appRespQues.length; i++) {
        console.log("this.appRespQues[i].reviewer_rating",this.appRespQues[i].reviewer_rating)
        total += this.appRespQues[i].reviewer_rating
      }
      this.currentstateform.total_rating = Number(this.currentstateform.reviewer_rating) + Number(total)
      var url:string
      if(this.startup.current_state_form_reviewed == false){
        url = "program/admin/response-current-state-form"
      }else{
        url = "program/admin/edit-current-state-form-admin"
      }
       
      let params = JSON.stringify({ "current_state_form": this.currentstateform })


      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe(data => {
        console.log(data);
        this.response = data;
        this.currentstateedit = true
        this.currentstateform = this.response.current_state_form
        this.startup = this.response.startup_registration;
      }, error => {
        console.log(error);
      })
    }

  }

  startupAccept(){
    debugger
    let url = "startup-accept-by-admin";
    let data = {startup_registration_id: this.startup_id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => 
      {
        console.log("acceptdata"+data);
      },
      error=> {
        console.log(error);
      });
  }
  startupReject(){
    debugger
    let url = "startup-reject-by-admin";
    let data = {startup_registration_id: this.startup_id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => 
      {
        console.log("rejectdata"+data);
      },
      error=> {
        console.log(error);
      })
  }


}
