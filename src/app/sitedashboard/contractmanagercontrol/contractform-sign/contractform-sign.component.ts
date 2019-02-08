import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-contractform-sign',
  templateUrl: './contractform-sign.component.html',
  styleUrls: ['./contractform-sign.component.css']
})
export class ContractformSignComponent implements OnInit {
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
  tcondtions: boolean
  qSubject:string
  qDescription:string
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

    this.getcontractdetails();
    //this.getAddContractInfo()

  }
  getcontractdetails() {
    let url = "program/startup/contract-data-for-startup";
    let params = { startup_registration_id: this.startup_id }
    this.apiCom.postData(url, JSON.stringify(params)).subscribe((res) => {
      res;
      this.contractdetails = res;
      console.log("res,res", res);
      this.startup = res.startup_application
      this.contractdetails = res.contract_form
      this.selected_add_info = res.additional_contract_information
    }, ((err: HttpErrorResponse) => {
        alert("Contract Form Not Found, Please Contact Admin")
    }))
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
    this.apiCom.getDataWithoutAuth(url)
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
  onSubmitReview(form: any) {
    if (this.tcondtions == true) {
      let url = "program/startup/startup-response-contract"
      let params = {
        contract_form: {
          id: form.value.id,
          startup_registration_id: form.value.startup_registration_id,
          accept_terms_condition: true
        }
      }
      this.apiCom.postData(url, params).subscribe((res) => {
        res;
        alert("Contract form Signed Successfully")
        this.router.navigate(['/'])
      })
    } else {
      alert("Please accept the terms and conditions")
    }
    console.log(form.value)



  }
  terms(value): any {
    this.tcondtions = value
  }

  askQueries(){
    $("#querypopup").modal('show')
  }

  submitQueries(){
    let  url = "program/startup-registration/queries"
    let params = JSON.stringify({startup_registration_id:this.startup.id,program_id:this.contractdetails.program_id,subject:this.qSubject,description:this.qDescription})
    this.apiCom.postData(url,params).subscribe((res)=>{
      res;
      console.log(res);
      alert("Queries Submitted Successfully")
      $("#querypopup").modal('hide')
      this.qDescription = undefined
      this.qSubject = undefined
    },(err:HttpErrorResponse)=>{
      alert(err)
      $("#querypopup").modal('hide')
    })
  
  
  }
  closepopup(){
    $("#querypopup").modal('hide')
  }

}
