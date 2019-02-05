import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-contractform-edit',
  templateUrl: './contractform-edit.component.html',
  styleUrls: ['./contractform-edit.component.css']
})
export class ContractformEditComponent implements OnInit {
  authToken: any
  user_role: any
  loggedIn: boolean
  site_admin = "site_admin"
  contract_manager = "contract_manager"
  startup_id: any
  contractdetails: any = {}
  startup: any = {}
  editable: boolean = false
  addContractInfo: any
  selected_add_info: any
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) {
    this.startup_id = +this.route.snapshot.paramMap.get('id')
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    this.user_role = this.getCookie('role')
    if (this.authToken.length != 0) {
      this.loggedIn = true;
      if (this.user_role == this.site_admin || this.user_role == this.contract_manager) {

      } else { this.router.navigate(['/']); }
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);
    }
    this.getcontractdetails();
    this.getAddContractInfo()

  }
  getcontractdetails() {
    let url = "program/startup/contract-data-for-startup";
    let params = { startup_registration_id: this.startup_id }
    this.apiCom.postDataWithToken(url, JSON.stringify(params), this.authToken).subscribe((res) => {
      res;
      this.contractdetails = res;
      console.log("res,res", res);
      this.startup = res.startup_application
      this.contractdetails = res.contract_form
      
    })
  }

  setupdate() {
    this.editable = true;
  }
  onChangeInfo(value: any) {
    debugger
    let id = parseInt(value);
    this.addContractInfo.forEach(element => {
      if (element.id === id) {
        this.selected_add_info = element;
      }
    });
  }
  getAddContractInfo() {
    let url = "get-contract-additional-information";
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        debugger
        console.log(data);
        this.addContractInfo = data;
        if (this.contractdetails.additional_contract_information_id != (null && undefined && 0)) {
          this.onChangeInfo(this.contractdetails.additional_contract_information_id);
        }
      }, error => {
        console.log(error);
      });
  }
  onSubmitReview(form:any){
    console.log(form.value)
    let url ="program/startup/update-contract"
    let params = JSON.stringify({contract_form:form.value})
    this.apiCom.putDataWithToken(url,params,this.authToken).subscribe((res)=>{
      res;
      alert("Contract form Updated Successfully")
      this.router.navigate(['dashboard/contract-manager'])
    })

  }
}


