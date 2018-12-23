import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from './shared-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cohort';
  checkStatus: string;
   loggedIn: boolean;
   message: string;

  constructor(private cookieService: CookieService,
              private router: Router,
              private sharedData: SharedDataService) {
                // this.detect.detectChanges();
               }
  ngOnInit() {
    // this.cookieService.set( 'appCookie', 'This is hello apps.' );
    this.sharedData.currentMessage.subscribe(message =>{
      this.message = message;
      this.loggedIn = true;
    })
    this.checkStatus = this.getCookie('Authorization');
    if (this.checkStatus.length != 0){
      debugger
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    // console.log(this.testCock);
  }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  deleteCookie(key: string){
    debugger
    return this.cookieService.deleteAll('/');
  }

  logout(): void{
    this.deleteCookie('Authorization');
    this.loggedIn = false;
                    // this.detect.detectChanges();
    this.router.navigate(['/']);
  }

}
