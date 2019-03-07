import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programsregistration',
  templateUrl: './programsregistration.component.html',
  styleUrls: ['./programsregistration.component.css']
})
export class ProgramsRegistrationComponent implements OnInit {
  program_id: number;
  formSubmitted: boolean = false
  application_questions: any;
  application_questions_form: any;
  startup_registration: any;
  app_ques:any;
  constructor(private apiService: ApiCommunicationService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
                 this.program_id = +this.route.snapshot.paramMap.get('id');
                 this.application_questions_form = this.fb.group({
                  application_question: new FormArray([])
                 })

               }

  ngOnInit() {
    // this.getAllProgram();
    this.getApplicationQuestion();
  }
  initAppQuesSubmit(form){
    debugger
    let dum_data = form.value;
    let data = {program_registration: this.startup_registration.program_registration,application_ques_response: dum_data.application_question, program_id: this.program_id };
    this.apiService.postData('program/startup-registration',JSON.stringify(data))
    .subscribe(data =>{
      console.log(data);
      alert("Registration Successful")
      this.router.navigate(['/']);
    },error =>{
      alert(`The following error has occured: ${error}`);
      console.log(error)
      })

    // this.apiService.postData('create-program-questions-response',JSON.stringify(data))
        // .subscribe(data =>{
        //   debugger
        //   console.log(data);
        //   this.router.navigate(['/']);
        // },error =>{
        //   debugger
        //   console.log(data)
        //   })


    // dum_data.application_question.forEach(element => {
    //   let data = {application_ques_response: element, program_id: this.program_id,startup_application_id: this.startup_application.id };
    //     this.apiService.postData('create-program-questions-response',JSON.stringify(data))
    //     .subscribe(data =>{
    //       console.log(data);
    //     },error =>{
    //       console.log(data)
    //       })
    // });
  }
 
  handleFormSubmit(form){
     this.startup_registration = {program_registration: form.value}
     this.startup_registration.program_registration.program_id = this.program_id;
     this.formSubmitted = true;
    // this.apiService.postData('program/startup-registration',JSON.stringify(data))
    // .subscribe(data =>{
    //   console.log(data);
    //   this.startup_application = data
    //   this.formSubmitted = true;
    // },error =>{
    //   console.log(error)
    //   })
  }
  createQuesResponse(element): FormGroup{
    return this.fb.group({
      application_question_id: element.id,
      response: ''
    });
  }
  getApplicationQuestion(){
    let data = {program_id: this.program_id};
    this.apiService.postData('show-program-questions',JSON.stringify(data))
    .subscribe(data => {
      console.log(data);
      this.application_questions = data;
      this.application_questions.forEach(element => {
        this.app_ques = this.application_questions_form.get('application_question') as FormArray;
        this.app_ques.push(this.createQuesResponse(element));
      });
    },error => {
      console.log(`Following error has occured: ${error}`);
    });
  }
  

}
