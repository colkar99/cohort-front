import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractmanager',
  templateUrl: './contractmanager.component.html',
  styleUrls: ['./contractmanager.component.css']
})
export class ContractManagerComponent implements OnInit {

  site_admin = "site_admin"
  contract_manager = "contract_manager"
  authToken: string;
  loggedIn: boolean;
  public user_details: any[];
  user_role: string;
  program_modules: any;
  startups: any;
  current_user: any;

  constructor(private apiCom: ApiCommunicationService,
              private cookieService: CookieService,
              private router: Router) { }

  getCookie(key: string){
    return this.cookieService.get(key);
  }
  

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    this.user_role = this.getCookie('role')
    this.current_user = this.getCookie('user_id');
    if (this.authToken.length != 0){
      this.loggedIn = true;
      if (this.user_role == this.site_admin || this.user_role == this.contract_manager ) { 
      } else {this.router.navigate(['/']); }
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    } 
    this.getAllProgram(); 
  }

  getAllProgram(){
      let url = "contract-manager-programs";
        this.apiCom.getDataWithAuth(url,this.authToken)
        .subscribe(data => {
            this.program_modules = data
            console.log(data);
        }, error => {
            console.log(`Following error has occured: ${error}`);
        });
    }
    onChange(value){
        debugger
        let url = "program/show-startup-for-contract";
        let data = {program_id: parseInt(value)};
        debugger
        this.apiCom.postDataWithToken(url ,JSON.stringify(data),this.authToken)
        .subscribe(data => {
            this.startups = data
            console.log(data);
        }, error => {
            console.log(`Following error has occured: ${error}`);
        });
    } 
}
