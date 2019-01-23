import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { ErrorDisplayComponent } from '../error-display/error-display.component'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // cookieValue = 'default';
  public loggedIn: boolean;
  checkStatus: string;
  loginUrl: string = "authenticate";
  message: string;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  @ViewChild(ErrorDisplayComponent) errdisplay

  onSubmit(): void {
    console.warn(this.loginForm.value);
    this.apiCom.postData(this.loginUrl, JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {
          console.log("success!", data);
          this.cookieService.set('Authorization', data.auth_token, 30, '/');
          this.cookieService.set('user_id', data.user_id, 30, '/');
          this.cookieService.set('user_type', data.user_type, 30, '/');
          this.cookieService.set('role', data.roles[0].name, 30, '/');
          this.newMessage();
          if (data.user_type == "site") {
            // this.router.navigate(['admin/dashboard']);
            if (data.roles[0].name == "site_admin") this.router.navigate(['admin/dashboard'])
            if (data.roles[0].name == "program_admin") this.router.navigate(['admin/dashboard/program-controls']);
            if (data.roles[0].name == "program_director") this.router.navigate(['admin/dashboard/program-controls']);
            if (data.roles[0].name == "contract_manager") this.router.navigate(['/dashboard/contract-manager']);
          } else if (data.user_type == "startup") {
            this.router.navigate(['startup/dashboard']);
          } else if (data.user_type == "mentor") {
            this.router.navigate(['mentor/dashboard']);

          }
          // this.router.navigate(['/']);
        },
        ((error) => {
          
          console.error("couldn't post because", error)
          this.errdisplay.openpopup("Warning!!!",error)
        })
      );
  };
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedData: SharedDataService) { }

  ngOnInit() {
    this.sharedData.currentMessage.subscribe(message => {
      this.message = message;
    })
    this.checkStatus = this.getCookie('Authorization');
    let user_type = this.getCookie('user_type');
    if (this.checkStatus.length != 0) {
      debugger
      this.loggedIn = true;

      this.router.navigate(['/']);
      // window.location.href = '/';
    } else {
      this.loggedIn = false;
    }
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  newMessage() {
    this.sharedData.changeMessage('Hello World');
  }

}
