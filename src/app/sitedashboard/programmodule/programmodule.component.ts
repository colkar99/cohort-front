import { Component,OnInit } from '@angular/core';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
    selector: 'app-programmodule',
    templateUrl: './programmodule.component.html',
    styleUrls: ['./programmodule.component.css']
})

export class ProgramModuleComponent implements OnInit {

    auth: string;
    loggedIn:boolean;
    program_modules: any[] =[];
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
    }
    ngOnInit(){
        this.getAllProgram();
    }
    getCookie(key: string){
        return this.cookieService.get(key);
      }

    getAllProgram(){
        this.apiService.getDataWithAuth("show-programs",this.auth)
        .subscribe(data => {
            this.program_modules = data
            console.log(data);
        }, error => {
            console.log(`Following error has occured: ${error}`);
        });
    }  

} 