import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-usermodule',
    templateUrl: './usermodule.component.html',
    styleUrls: ['./usermodule.component.css']
})

export class UsermoduleComponent implements OnInit{

    user: any ={};
    userOptions:any = [];
    auth: string;
    loggedIn: boolean;
    roles: any=[]
    isRolesAvailable: boolean = false;
    constructor(private formBuilder: FormBuilder,
                private apiService: ApiCommunicationService,
                private cookieService: CookieService){
        this.createUserForm();
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
    }
    createUserForm(){
        this.user =  this.formBuilder.group({
            user: this.formBuilder.group({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                user_type: ''
            }),
            role: this.formBuilder.group({
                role_id: ''
            })
          });
          this.userOptions = [
              {name: "Site user", value: "site"},
              {name: "Mentor user", value: "mentor"}
          ]
    }
    onSubmit(user: {}){
        console.log(this.user.value);
    }
    getRoles(user_type_role){
        debugger
        let data = {user_role_type: user_type_role};
        this.apiService.postDataWithToken('get-roles-user-type',JSON.stringify(data),this.auth)
        .subscribe(
            data => { 
                console.log(data);
                this.roles = data;
                if (data.length > 0) this.isRolesAvailable = true;
            },
            error => console.error("couldn't post because", error)
      );
    }

    getCookie(key: string){
        return this.cookieService.get(key);
      }
}