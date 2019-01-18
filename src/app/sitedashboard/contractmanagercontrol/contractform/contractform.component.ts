import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-contractmanager',
  templateUrl: './contractform.component.html',
  styleUrls: ['./contractform.component.css']
})
export class ContractFormComponent implements OnInit {

  site_admin = "site_admin"
  contract_manager = "contract_manager"
  authToken: string;
  loggedIn: boolean;
  public user_details: any[];
  user_role: string;
  startup_id: number;
  startup: any;
  program: any;
  party1_details: any;
  startup_address: any;
  addContractInfo: any;
  selected_add_info: any;
  reviewFormData: any;

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router,
              private route: ActivatedRoute) { 
                this.startup_id =  +this.route.snapshot.paramMap.get('id')
                this.party1_details = { p_1_name: "Startup Ignite",
                                        p_1_address: "Some address, /n some street, /n some villege",
                                        p_1_phone_number:"8056756218",
                                        p_1_email: "mail@gmail.com"
                
                  }
            }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    this.user_role = this.getCookie('role')
    if (this.authToken.length != 0){
      this.loggedIn = true;
      if (this.user_role == this.site_admin || this.user_role == this.contract_manager ) { 
      } else {this.router.navigate(['/']); }
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    } 
    this.getStartupReg(this.startup_id);
    this.getAddContractInfo();
  }

  getStartupReg(id: number){
      let url = "program/startup-application-details";
      let data = {startup_application_id: id};
      this.apiCom.postDataWithToken(url,JSON.stringify(data),this.authToken)
      .subscribe(data=> {
        console.log(data);
        this.startup = data.startup_application;
        this.program = data.program;
        this.setStartupAddress(this.startup)
      },error =>{
        console.log(error);
      })
      
  }
  getAddContractInfo(){
      let url = "get-contract-additional-information";
      this.apiCom.getDataWithAuth(url,this.authToken)
      .subscribe(data =>{
        debugger
          console.log(data);
          this.addContractInfo = data;
      },error => {
        console.log(error);
      });
  }
  setStartupAddress(startup){
    this.startup_address = {startup_add: `${startup.startup_address_line_1} ,
    ${startup.startup_address_line_2} ,
    ${startup.startup_city},
    ${startup.startup_state_province_region},
    ${startup.startup_zip_pincode_postalcode},
    ${startup.startup_country}`};
  }
  onChangeInfo(value: any){
    debugger
    let id  = parseInt(value);
    this.addContractInfo.forEach(element => {
      if (element.id === id){
        this.selected_add_info = element;
      }
    });
  }

  onSubmitReview(form: any){
    debugger
    this.reviewFormData = form.value;
    $('#reviewFormModal').modal('show');
  }

  
 
}
