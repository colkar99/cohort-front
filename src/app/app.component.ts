import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from './shared-data.service';
import { ApiCommunicationService } from './api-communication.service'
import { PusherService } from './pusher.service';

declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  count = 2;
  title = 'cohort';
  checkStatus: string;
  loggedIn: boolean;
  message: string;
  user_role: string;
  mentor: any = {};
  additonal: any = {}
  user_type:any;
  ////////////////////
  title_2 =  "Pusher likes";
  likes = 10;


  constructor(private cookieService: CookieService,
    private router: Router,
    private sharedData: SharedDataService,
    private apiCom:ApiCommunicationService,
    private pusherService: PusherService
  ) {
    // this.detect.detectChanges();
  }
  ngOnInit() {
    // this.cookieService.set( 'appCookie', 'This is hello apps.' );
    this.pusherService.channel.bind('new-like', data => {
      debugger
      this.likes = data.data ;
    });
    this.sharedData.currentMessage.subscribe(message => {
      this.message = message;
      this.loggedIn = true;
      this.user_role = this.getCookie('role');
      if (this.user_role == "contract_manager"){
        this.user_type = "contract_manager"
      }
      else{
        this.user_type = this.getCookie('user_type');
      }
    })
    this.checkStatus = this.getCookie('Authorization');
    this.user_role = this.getCookie('role');
    this.user_type = this.getCookie('user_type');
    if (this.checkStatus.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    // console.log(this.testCock);
  }

  liked(){
    this.likes = this.likes + 1;
    this.pusherService.like( this.likes )

  }
  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  deleteCookie(key: string) {
    return this.cookieService.deleteAll('/');
  }

  logout(): void {
    this.deleteCookie('Authorization');
    this.deleteCookie('role');
    this.deleteCookie('user_type');
    this.deleteCookie('user_id');
    this.loggedIn = false;
    // this.detect.detectChanges();
    this.router.navigate(['/']);
  }
  addmentor() {
    $("#mentorreg").modal('show');
    this.mentor = {}
    this.mentor.user_type = "mentor";
    this.additonal = {}
    this.additonal.type_name = "mentor"
  }
  savementor() {
    console.log("mentor", this.mentor, "additonal", this.additonal)
    let url = "user/mentor/registration";
    let params = JSON.stringify({ user: this.mentor, additional_details: this.additonal })
    this.apiCom.postData(url,params).subscribe((res)=>{
      res;
      alert("Mentor Registered Successfully")
    },(err:any)=>{
      alert(err)
    })
      $("#mentorreg").modal('hide');
  }
  closementor() {
    $("#mentorreg").modal('hide');
  }

  showChart(){
    this.sharedData.currentMessage.subscribe(message => {
      this.message = message;
    })
   
    this.newMessage();
  }
  newMessage() {
    this.sharedData.changeMessage('Hello World');
  }  
  // getUserDetails(auth){
  //   let url = "get-user-details"
  //   this.apiCom.getDataWithAuth(url,auth)
  //   .subscribe(
  //     data => { 
  //       console.log("success!", data);
  //       this.user_details = data;
  //   }, 
  //     error => console.error("couldn't post because", error)
  //   );
  // }

}
