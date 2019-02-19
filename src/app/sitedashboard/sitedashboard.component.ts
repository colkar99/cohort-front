import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';



@Component({
  selector: 'app-sitedashboard',
  templateUrl: './sitedashboard.component.html',
  styleUrls: ['./sitedashboard.component.css']
})
export class SitedashboardComponent implements OnInit {

  message: any;
  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  dataSource: Object;
  programChart: any;
  chartInstance: any = {};
  window_location: any;
  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router,
              private sharedData: SharedDataService) { 
                this.window_location = window.location.pathname;
                console.log(this.window_location);
                this.getProgramChart();
              }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  
  getUserDetails(){
    this.apiCom.getDataWithAuth(this.getUserUrl,this.authToken)
    .subscribe(
      data => { 
         if(data.roles[0].user_role_type != 'site'){
          this.logout();
         }
        console.log("success!", data);
        this.user_details = data;
        // if(this.user_details.role[0].user_role_type){}
    }, 
      error => console.error("couldn't post because", error)
    );
  }
  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.getUserDetails();  
    this.sharedData.currentMessage.subscribe(message => {
      debugger
      this.message = message;
      this.window_location = window.location.pathname;
    })
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

  deleteCookie(key: string) {
    debugger
    return this.cookieService.deleteAll('/');
  }

  getProgramChart(): void{
    this.apiCom.getDataWithoutAuth("chart/get-program-chart")
    .subscribe(data => {
      this.dataSource = data
      console.log(this.dataSource);
    }, error => {
      console.log(this.dataSource);
    })
  }

  initialized(e) {
    this.chartInstance = e.chart; // Save it for further use

    // Configure Drilldown attributes
    // See this : https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods#configureLink
    this.chartInstance.configureLink({
        type: "pie2d",
        overlayButton: {
            message: 'close',
            fontColor: '880000',
            bgColor: 'FFEEEE',
            borderColor: '660000'
        }
    }, 0)
  }

  changeLocation(){
    this.window_location = window.location.pathname;
    this.sharedData.currentMessage.subscribe(message => {
      this.message = message;
    })
   
    this.newMessage();
    this.router.navigate(['/admin/dashboard']);


  }
  newMessage() {
    this.sharedData.changeMessage('Hello World');
  }  
  

}
