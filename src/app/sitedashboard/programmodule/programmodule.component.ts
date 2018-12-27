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
    ngOnInit(){}

    getCookie(key: string){
        return this.cookieService.get(key);
      }

} 