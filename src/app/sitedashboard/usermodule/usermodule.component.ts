import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any
@Component({
    selector: 'app-usermodule',
    templateUrl: './usermodule.component.html',
    styleUrls: ['./usermodule.component.css']
})

export class UsermoduleComponent implements OnInit {

    user: any = {};
    userOptions: any = [];
    auth: string;
    loggedIn: boolean;
    roles: any = []
    isRolesAvailable: boolean = false;
    all_users = []
    unfilteredvalue = []
    filterfeild
    filtervalue
    constructor(private formBuilder: FormBuilder,
        private apiService: ApiCommunicationService,
        private cookieService: CookieService) {
        this.createUserForm();
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0) {
            this.loggedIn = true;
            // this.router.navigate(['/']);
        } else {
            this.loggedIn = false;
            window.location.href = '/login';
        }
    }
    ngOnInit() {
        this.getUsersList();
    }
    private imageSrc: string = '';

    handleInputChange(e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        console.log(this.imageSrc)
        this.user.value.user.user_main_image = this.imageSrc;
    }
    createUserForm() {
        this.user = this.formBuilder.group({
            user: this.formBuilder.group({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                user_type: '',
                user_main_image: ''
            }),
            role: this.formBuilder.group({
                role_id: ''
            })
        });
        this.userOptions = [
            { name: "Site user", value: "site" },
            { name: "Mentor user", value: "mentor" }
        ]
    }
    onSubmit(user: {}) {
        // console.log(this.user.value);
        this.user.value.user.user_main_image = this.imageSrc;
        debugger
        let data = JSON.stringify(this.user.value);
        this.apiService.postDataWithToken('create-user-by-admin', data, this.auth)
            .subscribe(
                data => {
                    $("#createUserModel").modal('show')
                    this.getUsersList();
                    console.log(data);
                },
                error => console.error("couldn't post because", error)
            );
    }
    getRoles(user_type_role) {
        let data = { user_role_type: user_type_role };
        this.apiService.postDataWithToken('get-roles-user-type', JSON.stringify(data), this.auth)
            .subscribe(
                data => {
                    console.log(data);
                    this.roles = data;
                    if (data.length > 0) this.isRolesAvailable = true;
                },
                error => console.error("couldn't post because", error)
            );
    }

    getCookie(key: string) {
        return this.cookieService.get(key);
    }
    getUsersList(): void {
        this.apiService.getDataWithAuth('get-all-users', this.auth)
            .subscribe(
                data => {
                    console.log(data);
                    this.all_users = data;
                    this.unfilteredvalue = data

                },
                error => console.error("couldn't post because", error)
            );
    }
    filtervalues(value: string) {
        if (this.filterfeild != 'phone_number') {
            console.log(this.filterfeild)
            this.all_users = this.unfilteredvalue.filter((list) => list[this.filterfeild].toLowerCase().includes(value.toLowerCase()))
        } else if (value != "") {
            this.all_users = this.unfilteredvalue.filter((list) => list[this.filterfeild].includes(value))
        } else {
            this.all_users = this.unfilteredvalue
        }

    }
    resetfilter(){
        this.all_users = this.unfilteredvalue
    }
}