import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $:any

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
    program_id: any
    reviewFormData: any
    selected_add_info: any

    constructor(private apiCom: ApiCommunicationService,
        private cookieService: CookieService,
        private router: Router) { }

    getCookie(key: string) {
        return this.cookieService.get(key);
    }


    ngOnInit() {
        this.authToken = this.getCookie('Authorization');
        this.user_role = this.getCookie('role')
        this.current_user = this.getCookie('user_id');
        this.program_id = this.getCookie('redirect_id');
        console.log("redirect_id", this.program_id)
        if (this.authToken.length != 0) {
            this.loggedIn = true;
            if (this.user_role == this.site_admin || this.user_role == this.contract_manager) {
            } else { this.router.navigate(['/']); }
        } else {
            this.loggedIn = false;
            this.router.navigate(['/login']);
        }
        this.getAllProgram();
        if (this.program_id != ("" && null && undefined && 0)) {
            this.onChange(this.program_id);
        }
    }

    getAllProgram() {
        let url = "contract-manager-programs";
        this.apiCom.getDataWithAuth(url, this.authToken)
            .subscribe(data => {
                this.program_modules = data
                console.log(data);
            }, error => {
                console.log(`Following error has occured: ${error}`);
            });
    }
    onChange(value) {
        debugger
        let url = "program/show-startup-for-contract";
        let data = { program_id: parseInt(value) };
        debugger
        this.cookieService.set("redirect_id", value)
        this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
            .subscribe(data => {
                this.startups = data
                console.log(data);
            }, error => {
                console.log(`Following error has occured: ${error}`);
            });
    }
    approvalreq(id) {
        let url = "program/startup/contract-data-for-startup";
        let params = { startup_registration_id: id }
        this.apiCom.postDataWithToken(url, JSON.stringify(params), this.authToken).subscribe((res) => {
            res;

            console.log("res,res", res);
            // this.startup = res.startup_application
            this.reviewFormData = res.contract_form;
            this.selected_add_info = res.additional_contract_information;

            $("#reviewFormModal").modal('show')

        })
    }
    Approve(values) {
        console.log("values", values)
        let params= {contract_form:{"id": this.reviewFormData.id}}
        let url = "program/startup/verify-and-approve-contract-form"
        this.apiCom.postDataWithToken(url, JSON.stringify(params), this.authToken).subscribe((res) => {
            res;
            alert("Contract Form Approved Successfully");
            this.onChange(this.program_id);
            $("#reviewFormModal").modal('hide')

        })
    }
}
