import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../../shared-data.service'
import {ApiCommunicationService} from '../../api-communication.service'
import {CookieService} from 'ngx-cookie-service'
@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  startupdata:any = {}
  slidervalue:any = 0
  
  authToken:any
  currentstateform:any ={}
 
  constructor(private sharedservice:SharedDataService,
    private apiCom:ApiCommunicationService,
    private cookieService:CookieService) {
    this.sharedservice.currentMessage.subscribe((res)=>{res;this.startupdata = res;
    if(this.startupdata.current_status.status == "SPC"){
      this.slidervalue = 25
    }else if(this.startupdata.current_status.status == "RMD"){
      this.slidervalue = 50
    }
    else if(this.startupdata.current_status.status == "VDC"){
      this.slidervalue = 75
    }
    else if(this.startupdata.current_status.status == "RMD"){
      this.slidervalue = 100
    }
    })
    console.log("startupdata",this.startupdata)
    
    this.authToken = this.getCookie("Authorization")
   }

  ngOnInit() {
    let url = "program/user/show-current-state-form"
    let params = {current_state_form:{program_id:this.startupdata.startup_registration.program_id,startup_registration_id:this.startupdata.startup_registration.id}}
    this.apiCom.postDataWithToken(url,JSON.stringify(params),this.authToken).subscribe((res)=>{
      res;
      this.currentstateform = res
    })

    
  }
  getCookie(key: string) {
    return this.cookieService.get(key)
  }


  


}
