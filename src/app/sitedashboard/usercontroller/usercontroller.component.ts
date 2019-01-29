import { Component ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
declare var $: any;

@Component({
    selector: 'app-usercontroller',
    templateUrl: './usercontroller.component.html',
    styleUrls: ['./usercontroller.component.css']
  })

  export class UsercontrollerComponent implements OnInit{

    userDatas: any[] =[];
    auth: string;
    loggedIn: boolean;
    user: any ={};
    userOptions:any = [];
    showForm: boolean = false;
    roles: any=[]
    privileges: any[] =[];
    modules: any[] = [];
    privilege: {} = {};
    privilegeForm: any = {};


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private apiService: ApiCommunicationService,
        private cookieService: CookieService,
        private formBuilder: FormBuilder    ){
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0){
          this.loggedIn = true;
          // this.router.navigate(['/']);
        } else {
          this.loggedIn = false;
          window.location.href = '/login';
        }
        this.privilegeForm = this.formBuilder.group({
            id: ['',Validators.required],
            module_type_id: ['', Validators.required],
            role_id: ['',Validators.required],
            user_id: ['',Validators.required],
            create_rule: [null ,Validators.required],
            update_rule: [null ,Validators.required],
            show_rule: [null ,Validators.required],
            delete_rule: [null , Validators.required]
        })
    }
    ngOnInit(){
        this.getUserData();
    }
    createUserForm(){
        this.user =  this.formBuilder.group({
            user: this.formBuilder.group({
                id: this.userDatas[0].user.id,
                first_name: this.userDatas[0].user.first_name,
                last_name: this.userDatas[0].user.last_name,
                email: this.userDatas[0].user.email,
                phone_number: this.userDatas[0].user.phone_number,
                user_type: this.userDatas[0].user.user_type
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
    getUserData(){
        let data = {"user_id": +this.route.snapshot.paramMap.get('id') }
        this.apiService.postDataWithToken('get-user-related-data',JSON.stringify(data),this.auth)
        .subscribe(
            data => { 
                console.log(data[0]);
                this.userDatas = data;
                this.privileges = data[0].privileges;
                this.modules = data[0].modules;
                // this.user = data[0].user;
                this.showForm = true;
                this.createUserForm();
                this.getRoles(this.userDatas[0].user.user_type);
            },
            error => console.error("couldn't post because", error)
      );
    }
    getCookie(key: string){
        return this.cookieService.get(key);
      }
    getRoles(user_type_role){
        
        let data = {user_role_type: user_type_role};
        this.apiService.postDataWithToken('get-roles-user-type',JSON.stringify(data),this.auth)
        .subscribe(
            data => { 
                console.log(data);
                this.roles = data;
            },
            error => console.error("couldn't post because", error)
      );
    } 
    onSubmit(user: {}){
        // console.log(this.user.value);
        let data = JSON.stringify(this.user.value);
        console.log(data);
        this.apiService.putDataWithToken('update-user-by-admin',data,this.auth)
        .subscribe(
            data => { 
                console.log(data);
                this.getUserData();
                alert("User successfully edited by admin")
            },
            error => console.error("couldn't post because", error)
      );
    }
    changePrivilegeValue(privilege){
        this.privilege = privilege;
        this.privilegeForm.patchValue({
            id: privilege.id,
            module_type_id: privilege.module_type_id,
            role_id:  privilege.role_id,
            user_id:  privilege.user_id,
            create_rule:  privilege.create_rule,
            update_rule: privilege.update_rule,
            show_rule: privilege.show_rule,
            delete_rule: privilege.delete_rule
        })
    }
    onPrivilegeUpdate(privilege: {}){
        let data = {"user_role": this.privilegeForm.value};
        console.log(JSON.stringify(data));
        this.apiService.putDataWithToken('put-user-role',JSON.stringify(data),this.auth)
        .subscribe(
            data => { 
                console.log(data);
                this.getUserData();
                $('#privilegeModel').modal('hide');
            },
            error => console.error("couldn't post because", error)
      );
    }
    onPrivilegeCreate(privilege: {}){
        
        let refData = this.privilegeForm.value;
        let data = {"user_role": {
            "user_id": refData.user_id,"role_id": refData.role_id,"module_type_id": refData.module_type_id,
            "create_rule": refData.create_rule,"update_rule": refData.update_rule,"show_rule": refData.show_rule,
            "delete_rule": refData.delete_rule }};
        console.log(JSON.stringify(data));
        this.apiService.postDataWithToken('create-user-role-by-admin',JSON.stringify(data),this.auth)
        .subscribe(
            data => { 
                console.log(data);
                this.getUserData();
                $('#createPrivilegemodel').modal('hide');
            },
            error => {
                console.error("couldn't post because", error);
                $('#createPrivilegemodel').modal('hide');
            }
      );
    }
    deletePrivilegesValue(privilege_id: number){
        let data = {"id": privilege_id};
        let confirmPopup = confirm(`Are you sure want to delete this privilege`);
        console.log(confirmPopup);
        if (confirmPopup) {
            this.apiService.putDataWithToken('delete-user-role',JSON.stringify(data),this.auth)
                .subscribe(
                    data => { 
                        console.log(data);
                        this.getUserData();
                    },
                    error => console.error("couldn't post because", error)
            );
        } else {
            return
        }


    }
    deleteRole(user_id: number,role_id: number){
        
        let data = {"user_id": user_id,role_id: role_id};
        let confirmPopup = confirm(`Are you sure want to delete this role`);
        if (confirmPopup) {
            this.apiService.postDataWithToken('delete-role-user-by-admin',JSON.stringify(data),this.auth)
            .subscribe(
                data => { 
                    // console.log(data);
                    this.getUserData();
                    // $('#createPrivilegemodel').modal('hide');
                },
                error => {
                    console.error("couldn't post because", error);
                    // $('#createPrivilegemodel').modal('hide');
                }
          );
        } else {
            return
        }

    }                
  }