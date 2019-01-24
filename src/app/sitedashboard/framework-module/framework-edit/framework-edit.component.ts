import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sitedashboard-framework-module-edit',
  templateUrl: './framework-edit.component.html',
  styleUrls: ['./framework-edit.component.css']
})
export class FrameworkModuleEditComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  framework_id: number;
  framework: any;
  allActivity: any;
  framework_activity: any;

  
  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) { }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  
  getUserDetails(){
    this.apiCom.getDataWithAuth(this.getUserUrl,this.authToken)
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
    if (this.authToken.length != 0){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.framework_id =  +this.route.snapshot.paramMap.get('id')
    this.getframework(this.framework_id)
    this.getFrameworkActivities(this.framework_id);
    this.getAllActivities();
    this.getUserDetails();
  }
  getframework(id: number){
    let url = "program/show-framework";
    let data = {framework:{id: id}};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => {
      console.log(data);
      this.framework = data;
    }, error => {
      console.log(error);
      alert(`the following error has happend`);
    })
  }
  getAllActivities(){
    let url = "program/framework/show-all-activities";
    this.apiCom.getDataWithAuth(url,this.authToken)
    .subscribe(data =>{
      console.log(data);
      this.allActivity = data;
    },error => {
      console.log(error);
    })
  }
  getFrameworkActivities(id: number){
    let url = "program/framework/show-activity";
    let data = {framework_id: id};
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data =>{
      console.log(data);
      this.framework_activity = data;
    },error => {
      console.log(error);
    })
  }
  updateForm(values){
    console.log(values);

  }

}
