import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'
import { ApiCommunicationService } from '../api-communication.service'
import {sharingData} from '../sharingdata'
@Component({
  selector: 'app-startupdashboard',
  templateUrl: './startupdashboard.component.html',
  styleUrls: ['./startupdashboard.component.css']
})
export class StartupdashboardComponent implements OnInit {
  startupprofile: any = {}
  startupid: any
  authToken: any
  menuname:any
  companylogo: any = "assets/photo.png"
  CompanyName: any = "PETRAS"
  Mentors: any = "Stanly,Selwyn"
  bio: any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns). Three Equal Columns Using Numbers. You can also use numbers to control the column width."
  currentstate: any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns)"
  constructor(private cookieService: CookieService, private apiCom: ApiCommunicationService,public sharedata:sharingData) {
    this.startupid = this.getCookie('startup_profile_id');
    this.authToken = this.getCookie('Authorization');
    this.menuname = "profile"
    
  }

  ngOnInit() {
    let url = "startup/show-profile";
    let params = JSON.stringify({ startup_profile: { id: this.startupid } })
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log(res);
      this.startupprofile = res;
      this.sharedata.startupprofile = res;
    })
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  menunames(name){
    this.menuname = name
  }

}
