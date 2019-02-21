import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
import { SharedDataService } from '../../shared-data.service'

@Component({
    selector: 'app-programmodule',
    templateUrl: './programmodule.component.html',
    styleUrls: ['./programmodule.component.css']
})

export class ProgramModuleComponent implements OnInit {

    auth: string;
    loggedIn: boolean;
    program_modules: any = {}
    program_type: any;
    program_location: any;
    program_type_edit: boolean = false;
    program_location_edit: boolean = false;
    question_edit: boolean = false
    question: any = {}
    allquestions: any = []
    filterfeild1: any
    filterfeild2: any
    filterfeild3: any
    filterfeild4: any
    filtervalue1: any
    filtervalue2: any
    filtervalue3: any
    filtervalue4: any
    ques_unfiltered: any
    program_modules_unfilter: any
    listprograms: any
    listprogramtypes: any
    listlocations: any
    message: any
    constructor(
        private cookieService: CookieService,
        private formBuilder: FormBuilder,
        private apiService: ApiCommunicationService,
        private sharedService: SharedDataService
    ) {
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
        this.getAllProgram();
        this.initForm();
        this.getallques();
        // this.sharedService.currentMessage.subscribe(message => {
        //     this.message = message;
        //   })
        //   this.newMessage();
    }
    // newMessage() {
    //     this.sharedService.changeMessage('Hello World');
    //   }
    
    getCookie(key: string) {
        return this.cookieService.get(key);
    }

    getAllProgram() {
        this.apiService.getDataWithAuth("show-programs", this.auth)
            .subscribe(data => {
                this.program_modules = data;
                this.listprograms = data.programs
                this.listprogramtypes = data.program_types
                this.listlocations = data.program_locations
                this.program_modules_unfilter = data;
                console.log(data);
            }, error => {
                console.log(`Following error has occured: ${error}`);
            });
    }

    initForm() {
        this.program_type = {
            "program_type_title": "",
            "program_type_description": "",
            "program_type_duration": 1,
            "program_type_logo": "",
            "program_type_main_image": ""
        };
        this.program_location = {
            "address_line_1": "",
            "address_line_2": "",
            "city": "",
            "state_province_region": "",
            "zip_pincode_postalcode": "",
            "country": ""
        }
        this.program_type_edit = false;
        this.program_location_edit = false;
    }
    initProgramTypeValue(program_type: any) {
        console.log(program_type);
        this.program_type = {
            "id": program_type.id,
            "program_type_title": program_type.program_type_title,
            "program_type_description": program_type.program_type_description,
            "program_type_duration": program_type.program_type_duration,
            "program_type_logo": program_type.program_type_logo,
            "program_type_main_image": program_type.program_type_main_image
        }
        this.program_type_edit = true;

    }
    initProgramlocationValue(program_location: any) {
        console.log(program_location);
        this.program_location = {
            "id": program_location.id,
            "address_line_1": program_location.address_line_1,
            "address_line_2": program_location.address_line_2,
            "city": program_location.city,
            "state_province_region": program_location.state_province_region,
            "zip_pincode_postalcode": program_location.zip_pincode_postalcode,
            "country": program_location.country
        }
        this.program_location_edit = true;
        $('#programLocationmodel').modal('show');

    }
    initQuestionsvalue(value) {
        this.question = value;
        this.question_edit = true;
        $('#programquestionmodal').modal('show');
    }
    submitProgramType(form: any, type: string) {
        debugger
        let url: string;
        let data: any;
        if (type === 'type') {
            url = "create-program-type";
            data = { program_type: form.value };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        } else if (type === 'location') {
            url = "create-program-location";
            data = { program_location: form.value };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        } else if (type === 'questions') {
            url = "create-application-question";
            data = { application_question: form.value };
            console.log(data);
            $('#programquestionmodal').modal('hide');
            this.question_edit = false;
        }

        if (type === 'questions') {
            this.apiService.postDataWithToken(url, JSON.stringify(data), this.auth)
                .subscribe(data => {
                    console.log(data);
                    this.getallques();
                }, error => {
                    console.log(error);
                })
        } else {
            this.apiService.postDataWithToken(url, JSON.stringify(data), this.auth)
                .subscribe(data => {
                    console.log(data);
                    this.getAllProgram();
                }, error => {
                    console.log(error);
                })
        }

    }
    updateProgramType(form: any, type: string) {
        debugger
        let url: string;
        let data: any;
        if (type === 'type') {
            url = "edit-program-type";
            data = { program_type: form.value };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        } else if (type === 'location') {
            url = "edit-program-location";
            data = { program_location: form.value };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        }
        else if (type === 'questions') {
            url = "edit-application-question";
            data = { application_question: form.value };
            console.log(data);
            $('#programquestionmodal').modal('hide');
            this.question_edit = false;
        }

        this.apiService.putDataWithToken(url, JSON.stringify(data), this.auth)
            .subscribe(data => {
                console.log(data);
                this.getAllProgram();
                this.getallques();
            }, error => {
                console.log(error);
            })


    }
    deleteProgramType(id: any, type: string) {
        let url: string;
        let data: any;
        if (type === 'type') {
            url = "delete-program-type";
            data = { program_type: { id: id } };
            console.log(data);
            $('#programTypemodel').modal('hide');
            this.program_type_edit = false;
        } else if (type === 'location') {
            url = "delete-program-location";
            data = { program_location: { id: id } };
            console.log(data);
            $('#programLocationmodel').modal('hide');
            this.program_location_edit = false;
        }
        this.apiService.postDataWithToken(url, JSON.stringify(data), this.auth)
            .subscribe(data => {
                console.log(data);
                this.getAllProgram();
            }, error => {
                console.log(error);
            })
    }
    viewprogram(program) {
        this.sharedService.changeMessage(program);
    }

    deleteQuestion(ques) {
        let url = "delete-application-question"
        let params = JSON.stringify({ application_question: { id: ques } })
        this.apiService.putDataWithToken(url, params, this.auth).subscribe((res) => {
            res;
            alert("Question Deleted Successfully");
            this.getallques();
        })
    }
    getallques() {
        this.apiService.getDataWithAuth("show-application-questions", this.auth).subscribe((res) => {
            res;
            this.allquestions = res;
            this.ques_unfiltered = res;
            console.log(res)
        })
    }
    addques() {
        this.question = {}
    }

    filtervalues(value: string) {
        console.log(value, this.filterfeild1)
        if (this.filterfeild1 == 'duration') {
            if (value == "") {
                this.listprograms = this.program_modules_unfilter.programs
            } else {
                this.listprograms = this.program_modules_unfilter.programs.filter((list) => list[this.filterfeild1] == Number(value))
            }

        }
        else if (this.filterfeild1 == "seat_size") {
            if (value == "") {
                this.listprograms = this.program_modules_unfilter.programs
            } else {
                this.listprograms = this.program_modules_unfilter.programs.filter((list) => list[this.filterfeild1] == Number(value))
            }

        }
        else if (value != "") {
            this.listprograms = this.program_modules_unfilter.programs.filter((list) => list[this.filterfeild1].toLowerCase().includes(value.toLowerCase()))
        }
        else {
            this.listprograms = this.program_modules_unfilter.programs
        }

    }
    filtervalues1(value: string) {
        if (value != "") {
            this.listprogramtypes = this.program_modules_unfilter.program_types.filter((list) => list[this.filterfeild2].toLowerCase().includes(value.toLowerCase()))
        } else {
            this.listprogramtypes = this.program_modules_unfilter.program_types
        }

    }
    filtervalues2(value: string) {
        if (value != "") {
            this.listlocations = this.program_modules_unfilter.program_locations.filter((list) => list[this.filterfeild3].toLowerCase().includes(value.toLowerCase()))
        } else {
            this.listlocations = this.program_modules_unfilter.program_locations
        }

    }
    filtervalues3(value: string) {
        if (value != "") {
            this.allquestions = this.ques_unfiltered.filter((list) => list[this.filterfeild4].toLowerCase().includes(value.toLowerCase()))
        } else {
            this.allquestions = this.ques_unfiltered
        }

    }

    reset1() {
        this.listprograms = this.program_modules_unfilter.programs
    }
    reset2() {
        this.listprogramtypes = this.program_modules_unfilter.program_types
    }
    reset3() {
        this.listlocations = this.program_modules_unfilter.program_locations
    }
    reset4() {
        this.allquestions = this.ques_unfiltered
    }

} 