import { Component,OnInit } from '@angular/core';
import { FormControl , FormGroup , FormBuilder,FormArray, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute} from '@angular/router';
declare var $: any;
declare var CKEDITOR: any;

@Component({
    selector: 'app-createprogram',
    templateUrl: './createprogram.component.html',
    styleUrls: ['./createprogram.component.css']
})

export class CreateProgramComponent implements OnInit {

    auth: string;
    loggedIn:boolean;
    program: any =[];
    application_questions_ids: any = [];
    showForm: boolean = false;
    datas = [];
    reviewAndSubmit: any = { application_questions:[] };
    submitted = false;
    showReviewAndSubmit = false;
    hideArrayControl: boolean;

    program_id:any
    sharedata:any ={}

    main_image= "";
    logo_image = "";
    imageSrc;
    ckEditorConfig: any

    constructor(
        private cookieService: CookieService,
        private formBuilder: FormBuilder,
        private apiService: ApiCommunicationService,
        private router: Router,
        private route:ActivatedRoute,
        
   
    ){
        this.auth = this.getCookie('Authorization');
        if (this.auth.length != 0){
          this.loggedIn = true;
          // this.router.navigate(['/']);
        } else {
          this.loggedIn = false;
          window.location.href = '/login';
        }
        this.getProgramModuleDatas();
        this.ckEditorConfig =
      {
        //extraPlugins: 'font', 
        "toolbarGroups": [
          { name: 'tools' },
          { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
          { name: 'styles' },
          { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] }, 
        ],
        // [
        //   { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        //   { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        //   { name: 'insert' },
        //   { name: 'forms' },
        //   { name: 'tools' },
        //   { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
        //   { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        //   { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        //   { name: 'styles' },
        //   { name: 'colors' },
        //   { name: 'about' },
        // { name: 'font' }
        // ]
        "removeButtons": "Source,Save,Templates,Find,Replace,Scayt,SelectAll"
      }
    }
    ngOnInit(){
        
    }

    getCookie(key: string){
        return this.cookieService.get(key);
      }

    initProgramForm(controls: any){
        this.program = this.formBuilder.group({
                title: ['',Validators.required],
                description: ['',Validators.required],
                start_date:['',Validators.required],
                end_date: ['',Validators.required],
                seat_size: [null, Validators.required],
                industry: ['',Validators.required],
                main_image: [''],
                logo_image: [''],
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
            application_questions: new FormArray(controls)
        });
        this.showForm = true;
        this.hideArrayControl = true;

    };

    getProgramModuleDatas(){
        this.apiService.getDataWithAuth("get-program-module",this.auth)
        .subscribe(data =>{
            this.datas = data;
            const controls = data.application_questions.map(c => new FormControl(false));
            controls[0].setValue(true); // Set the first checkbox to true (checked)
            console.log(this.datas);
            this.initProgramForm(controls);
        }, error => {
            console.error("couldn't post because", error);

        })
    }

    onProgramSubmit(program: any,datas: any){
        this.submitted = true;
        let program_types: any[];
        this.reviewAndSubmit["application_questions"] = [];
        this.application_questions_ids = this.program.value.application_questions
        .map((v, i) => v ? datas.application_questions[i].id : null)
        .filter(v => v !== null);
        console.log(this.application_questions_ids);
        if (program.valid){
            for(let item of datas.program_types){
                if(item.id == program.value.program_type_id){
                    this.reviewAndSubmit["program_type"] = item;
                }
                
            }
            for(let item of datas.program_locations){
                if(item.id == program.value.ProgramLocation_id){
                    this.reviewAndSubmit["program_location"] = item ;
                }
                
            }
            for(let item of datas.frameworks){
                if(item.id == program.value.framework_id){
                    this.reviewAndSubmit["framework"] = item;
                } 
            }
            for(let item of datas.users.program_admin){
                if(item.id == program.value.program_admin){
                    this.reviewAndSubmit["program_admin"] = item;
                } 
            }
            for(let item of datas.users.program_director){
                if(item.id == program.value.program_director){
                    this.reviewAndSubmit["program_director"] = item;
                } 
            }
            for(let item of datas.users.application_manager){
                if(item.id == program.value.application_manager){
                    this.reviewAndSubmit["application_manager"] = item;
                } 
            }
            for(let item of datas.users.contract_manager){
                if(item.id == program.value.contract_manager){
                    this.reviewAndSubmit['contract_manager'] = item;
                }
                this.showReviewAndSubmit = true; 
            }
            for(let item of datas.application_questions){
                for (let item2 of this.application_questions_ids){
                    if (item.id == item2){
                        this.reviewAndSubmit["application_questions"].push(item);
                    }
                }
            }
            program.value.main_image = this.main_image;
            program.value.logo_image = this.logo_image;
            this.reviewAndSubmit['program_details'] =  program.value;
            $('#reviewAndSubmitModel').modal('show');
        }
        console.log(this.reviewAndSubmit);
        
    };
    onSubmitProgramForms(){
        this.program.removeControl('application_questions')
        this.program.value.main_image = this.main_image;
        this.program.value.logo_image = this.logo_image;
        this.hideArrayControl = false
        let data = {"program": this.program.value, "application_questions": this.reviewAndSubmit.application_questions};
        this.apiService.postDataWithToken("create-program",JSON.stringify(data),this.auth)
        .subscribe(data => {
            console.log(data);
            alert("Cohort Program Created Successfully")
            $('#reviewAndSubmitModel').modal('hide');
            this.router.navigate(['/admin/dashboard/program']);

        }, error =>{
            console.log(`errors: ${error}`);
        });
    }  

    handleInputChange(e,main,logo) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
          alert('invalid format');
          return;
        }
        reader.onload = this._handleReaderLoaded.bind(this,main,logo);
        reader.readAsDataURL(file);
      }
      _handleReaderLoaded(main: boolean,logo: boolean,e) {
          debugger
        let reader = e.target;
        this.imageSrc = reader.result;
        console.log(this.imageSrc)
        debugger
        if (main){
            this.main_image = this.imageSrc
        }
        else{
            this.logo_image = this.imageSrc
        }
        // this.user.value.user.user_main_image = this.imageSrc;
      }

      checkdate(e) {
        console.log("e", this.program.value)
        if (e != "" && e != undefined) {
          if (e < this.program.value.start_date) {
            
          } else {
            this.program.controls['application_start_date'].setValue(undefined)
            alert("Registration Start Date should be lesser than Program Start Date")
          }
        }
    
      }
    
      checkdate1(e) {
        console.log("e", this.program.value)
        if (e != "" && e != undefined) {
          if (e < this.program.value.start_date && e > this.program.value.start_date) {
            
          } else {
            this.program.controls['application_end_date'].setValue(undefined)
            alert("Registration End Date should be lesser than Program Start Date & Greater than Registration Start Date")
          }
        }
    
      }
      prgenddate(e) {
        console.log("e", this.program.value)
        if (e != "" && e != undefined) {
          if (e > this.program.value.start_date ) {
            let DisplayTo = new Date(this.program.value.end_date)
            let DisplayFrom = new Date(this.program.value.start_date)
            console.log("hello duration", DisplayTo.getMonth() - DisplayFrom.getMonth() + (12 * (DisplayTo.getFullYear() - DisplayFrom.getFullYear())))
            let value =  DisplayTo.getMonth() - DisplayFrom.getMonth() + (12 * (DisplayTo.getFullYear() - DisplayFrom.getFullYear()))
           this.program.controls['duration'].setValue(value) ;
          } else {
            this.program.controls['end_date'].setValue(undefined)
            alert("Program End Date should be Greater than Program Start Date")
          }
        }
    
      }
    
      prgstartdate(e){
        if(e != "" && this.program.value.end_date !="" && e != undefined && this.program.value.end_date != undefined ) {
          let DisplayTo = new Date(this.program.value.end_date)
          let DisplayFrom = new Date(this.program.value.start_date)
          let value =  DisplayTo.getMonth() - DisplayFrom.getMonth() + (12 * (DisplayTo.getFullYear() - DisplayFrom.getFullYear()))
          console.log("hello duration", DisplayTo.getMonth() - DisplayFrom.getMonth() + (12 * (DisplayTo.getFullYear() - DisplayFrom.getFullYear())))
          this.program.controls['duration'].setValue(value) ;
        }
      }

} 