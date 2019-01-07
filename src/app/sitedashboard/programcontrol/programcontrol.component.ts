import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/util';

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
  showStartup: boolean = false;

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router) { }

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
    this.getUserDetails();
    this.getAllProgram();  
  }
  getAllProgram(){
    this.apiCom.getDataWithoutAuth('get-list-of-programs')
    .subscribe(data => {
    //   this.allPrograms = data;
      this.livePrograms = data.all_programs.live;
      this.expPrograms = data.all_programs.exp;
      console.log(data);
      console.log(data.all_programs.live);
      console.log(data.all_programs.exp);
      this.setStatusForPrograms(data);
    }, error =>{
      console.log(`The following error has been occured: ${error}`)

    })
  }
  setStatusForPrograms(programs){
    this.allPrograms = [];
        for(let data of programs.all_programs.live){
            console.log(data);
            data["status"] = "Running"
            this.allPrograms.push(data)
        }
        for(let data of programs.all_programs.exp){
            console.log(data);
            data["status"] = "Expired"
            this.allPrograms.push(data)
        }
        console.log(this.allPrograms);

  }
  showStartups(id: number){
    let data ={"program_id": id};
    let url = "program/show-startup-program-wise";
    this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data => {
        console.log(data);
        this.allStartups = data;
        this.showStartup = true;
    }, error => {   
        console.log(error);
    })

  }
  getStartupRegQues(startup_id: number,program_id: number){
      let url: string = "get-program-question-response";
      let data: {} = {startup_registration_id: startup_id,program_id: program_id};
        this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
        .subscribe(data => {
            console.log(data);
        }, error => {
            console.log(data)
        })
  }
  
}
