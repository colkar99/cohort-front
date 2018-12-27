import { Component,OnInit } from '@angular/core';
import { FormControl , FormGroup , FormBuilder, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-createprogram',
    templateUrl: './createprogram.component.html',
    styleUrls: ['./createprogram.component.css']
})

export class CreateProgramComponent implements OnInit {

    auth: string;
    loggedIn:boolean;
    program: any =[];
    constructor(
        private cookieService: CookieService,
        private formBuilder: FormBuilder,
        private apiService: ApiCommunicationService
    ){
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0){
          this.loggedIn = true;
          // this.router.navigate(['/']);
        } else {
          this.loggedIn = false;
          window.location.href = '/login';
        }
        this.initProgramForm();
        this.getProgramModuleDatas();
    }
    ngOnInit(){}

    getCookie(key: string){
        return this.cookieService.get(key);
      }
    initProgramForm(){
        this.program = this.formBuilder.group({
            title: ['',Validators.required],
            description: ['',Validators.required],
            start_date:['',Validators.required],
            end_date: ['',Validators.required],
            seat_size: [null, Validators.required],
            industry: ['',Validators.required],
            main_image: ['',Validators.required],
            logo_image: ['',Validators.required],
            duration: ['',Validators.required],
            application_start_date: ['',Validators.required],
            application_end_date: ['',Validators.required],
            ProgramLocation_id: [null,Validators.required],
            program_type_id: [null,Validators.required],
            framework_id: [null,Validators.required],
            program_admin: [null,Validators.required],
            program_director: [null,Validators.required],
            application_manager: [null,Validators.required],
            contract_manager: [null,Validators.required],

        })
    };
    getProgramModuleDatas(){
        this.apiService.getDataWithAuth("get-program-module",this.auth)
        .subscribe(data =>{
            console.log(data);
        }, error => {
            console.error("couldn't post because", error);

        })
    }  

} 