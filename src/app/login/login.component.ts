import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ErrorDisplayComponent } from '../error-display/error-display.component'
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider } from  "angular4-social-login";
import { SocialUser } from "angular4-social-login";
declare var $:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // cookieValue = 'default';
  private user: SocialUser;
  public loggedIn: boolean;
  checkStatus: string;
  loginUrl: string = "authenticate";
  message: string;
  resetmail:String;
  user_type: string;
  loginForm = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,Validators.required)
  });
  @ViewChild(ErrorDisplayComponent) errdisplay

  onSubmit(): void {
    console.warn(this.loginForm.value);
    this.apiCom.postData(this.loginUrl, JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {
          console.log("success!", data);
          this.commonSuccessLogin(data);
        },
        ((error) => {
          console.error("couldn't post because", error)
          this.errdisplay.openpopup("Warning!!!", error)
        })
      );
  };
  commonSuccessLogin(data){
    this.cookieService.set('Authorization', data.auth_token, 30, '/');
          this.cookieService.set('user_id', data.user_id, 30, '/');
          this.cookieService.set('user_type', data.user_type, 30, '/');
          if(data.user_type == 'startup'){
            this.cookieService.set('startup_profile_id', data.startup_profile_id, 30, '/');
          }
          if (data.roles != undefined) {
            this.cookieService.set('role', data.roles[0].name, 30, '/');
          }

          this.newMessage();
          if (data.user_type == "site") {
            // this.router.navigate(['admin/dashboard']);
            if (data.roles[0].name == "site_admin") this.router.navigate(['admin/dashboard'])
            if (data.roles[0].name == "program_admin") this.router.navigate(['admin/dashboard/program-controls']);
            if (data.roles[0].name == "program_director") this.router.navigate(['admin/dashboard/program-controls']);
            if (data.roles[0].name == "contract_manager") this.router.navigate(['/dashboard/contract-manager']);
          } else if (data.user_type == "startup") {
            this.router.navigate(['startup/dashboard/profile']);
          } else if (data.user_type == "mentor") {
            this.router.navigate(['mentor/dashboard']);

          }
          // this.router.navigate(['/']);
  }
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedData: SharedDataService,
    private authService: AuthService) { }
    
    signInWithGoogle(): void {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
   
    signOut(): void {
      this.authService.signOut();
    }
  googleLoginApi(user){
    debugger
    let user_data = user
    let url = "google-login"
    if (user == null) return;
    let data = {email: user_data.email,full_name: user_data.name,type: 'google'}
    this.apiCom.putDataWithoutToken(url,JSON.stringify(data))
    .subscribe(data =>{
      console.log(data);
      this.signOut();
      this.commonSuccessLogin(data);
    }, error=>{
      console.log(error);
      alert(error);
      this.signOut();
    })
  } 
  
  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.message = message;
    })
    this.checkStatus = this.getCookie('Authorization');
    this.user_type = this.getCookie('user_type');

    if (this.checkStatus.length != 0) {
      debugger
      this.loggedIn = true;

      this.router.navigate(['/']);
      // window.location.href = '/';
    } else {
      this.loggedIn = false;
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleLoginApi(this.user)
    });
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  newMessage() {
    this.sharedData.changeMessage('Hello World');
  }

  resetpwd(){
    $("#pwdchange").modal('show')
  }
  submitpwd(){
    let url = "password-reset-link"
    let params = JSON.stringify({user:{email: this.resetmail}})
    this.apiCom.putDataWithoutToken(url,params).subscribe((res)=>{
      res;
      if(res){
        alert("Reset link has been sent to your email id");
        $("#pwdchange").modal('hide')
      }
    })
  }
  closepwd(){
    this.resetmail = undefined
    $("#pwdchange").modal('hide')
  }

}
