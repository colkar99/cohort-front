import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import { SharedDataService } from '../../../shared-data.service'
declare var CKEDITOR: any;
@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit {
  auth: string;
  loggedIn: boolean;
  program: any = [];
  application_questions_ids: any = [];
  showForm: boolean = false;
  datas: any = {}
  reviewAndSubmit: any = { application_questions: [] };
  submitted = false;
  showReviewAndSubmit = false;
  hideArrayControl: boolean;
  program_id: any
  sharedata: any = {}
  main_image: any
  logo_image: any
  imageSrc: any
  programquestions: any = []
  arrayids: any = []
  allquestions: any = []
  displayallques: any = []
  ckEditorConfig: any
  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private apiService: ApiCommunicationService,
    private router: Router,
    private route: ActivatedRoute,
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
  ngOnInit() {
    this.program_id = +this.route.snapshot.paramMap.get('id')
    this.sharedService.currentMessage.subscribe((res) => {
      this.sharedata = res;
      console.log("sharedata", this.sharedata)
      this.getProgramModuleDatas();
    })
  }
  //main image upload
  handleInputChange(e, main, logo) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this, main, logo);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(main: boolean, logo: boolean, e) {
    debugger
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
    debugger
    if (main) {
      this.main_image = this.imageSrc
    }
    else {
      this.logo_image = this.imageSrc
    }
    // this.user.value.user.user_main_image = this.imageSrc;
  }
  //get cookie value
  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  //setting values to form
  setformvalues() {
    this.program = this.formBuilder.group({
      id: this.sharedata.id,
      title: [this.sharedata.title, Validators.required],
      description: [this.sharedata.description, Validators.required],
      start_date: [this.sharedata.start_date, Validators.required],
      end_date: [this.sharedata.end_date, Validators.required],
      seat_size: [this.sharedata.seat_size, Validators.required],
      industry: [this.sharedata.industry, Validators.required],
      main_image: this.sharedata.main_image,
      logo_image: this.sharedata.logo_image,
      duration: [this.sharedata.duration, Validators.required],
      application_start_date: [this.sharedata.application_start_date, Validators.required],
      application_end_date: [this.sharedata.application_end_date, Validators.required],
      ProgramLocation_id: [this.sharedata.ProgramLocation_id, Validators.required],
      program_type_id: [this.sharedata.program_type_id, Validators.required],
      framework_id: [this.sharedata.framework_id, Validators.required],
      program_admin: [this.sharedata.program_admin, Validators.required],
      program_director: [this.sharedata.program_director, Validators.required],
      application_manager: [this.sharedata.application_manager, Validators.required],
      contract_manager: [this.sharedata.contract_manager, Validators.required],
      application_questions: new FormArray([])
    });
    this.showForm = true;
    this.hideArrayControl = true;
    this.getquestions();
    console.log(this.program)
  }
  //getprogram data
  getProgramModuleDatas() {
    this.apiService.getDataWithAuth("get-program-module", this.auth)
      .subscribe(data => {
        this.allquestions = Object.assign([], data.application_questions)
        this.datas = data;
        // const controls = data.application_questions.map(c => new FormControl(false));
        // controls[0].setValue(true); // Set the first checkbox to true (checked)
        console.log("datas", this.datas);
        this.setformvalues();
      }, error => {
        console.error("couldn't post because", error);

      })
  }
  //popup review and submit
  onProgramSubmit(program: any, datas: any) {
    this.submitted = true;
    let program_types: any[];
    this.reviewAndSubmit["application_questions"] = [];
    this.application_questions_ids = this.program.value.application_questions
      .map((v, i) => v ? datas.application_questions[i].id : null)
      .filter(v => v !== null);
    console.log(this.application_questions_ids);
    if (program.valid) {
      for (let item of datas.program_types) {
        if (item.id == program.value.program_type_id) {
          this.reviewAndSubmit["program_type"] = item;
        }

      }
      for (let item of datas.program_locations) {
        if (item.id == program.value.ProgramLocation_id) {
          this.reviewAndSubmit["program_location"] = item;
        }

      }
      for (let item of datas.frameworks) {
        if (item.id == program.value.framework_id) {
          this.reviewAndSubmit["framework"] = item;
        }
      }
      for (let item of datas.users.program_admin) {
        if (item.id == program.value.program_admin) {
          this.reviewAndSubmit["program_admin"] = item;
        }
      }
      for (let item of datas.users.program_director) {
        if (item.id == program.value.program_director) {
          this.reviewAndSubmit["program_director"] = item;
        }
      }
      for (let item of datas.users.application_manager) {
        if (item.id == program.value.application_manager) {
          this.reviewAndSubmit["application_manager"] = item;
        }
      }
      for (let item of datas.users.contract_manager) {
        if (item.id == program.value.contract_manager) {
          this.reviewAndSubmit['contract_manager'] = item;
        }
        this.showReviewAndSubmit = true;
      }
      for (let item of datas.application_questions) {
        for (let item2 of this.application_questions_ids) {
          if (item.id == item2) {
            this.reviewAndSubmit["application_questions"].push(item);
          }
        }
      }
      this.reviewAndSubmit['program_details'] = program.value;
      $('#reviewAndSubmitModel').modal('show');
    }
    console.log(this.reviewAndSubmit);

  };

  //update program :
  onSubmitProgramForms() {
    this.program.removeControl('application_questions')
    this.hideArrayControl = false
    this.program.value.main_image = this.main_image;
    this.program.value.logo_image = this.logo_image;
    let data = { "program": this.program.value, "application_questions": this.reviewAndSubmit.application_questions };
    this.apiService.putDataWithToken("edit-program", JSON.stringify(data), this.auth)
      .subscribe(data => {
        console.log(data);
        $('#reviewAndSubmitModel').modal('hide');
        alert("Program Updated Successfully")
        this.router.navigate(['/admin/dashboard/program']);

      }, error => {
        console.log(`errors: ${error}`);
      });
  }
  //array collection of selected Questions in list
  setvalues(checked, value) {
    if (checked == true) {
      this.arrayids.push({ id: value.id });
    } else {
      if (checked == false) {

        let deleteindex = this.arrayids.findIndex(x => x.id == value.id)
        debugger
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayids.splice(deleteindex, 1)
          console.log("this.arrayids", this.arrayids)
        }
      }
    }
  }

  //delete program questions
  deleteappques(item, i) {
    let url = "program/delete-application-question-to-program"
    let params = JSON.stringify({ program_id: this.program.value.id, application_questions: [{ id: item.id }] })
    this.apiService.putDataWithToken(url, params, this.auth).subscribe((res) => {
      res;
      console.log("response", res);
      alert("Program Question Deleted Successfully")
      this.getquestions();
      this.programquestions.splice(i, 1);


    })
  }

  // Update application questions
  updateApplicationQuestions() {
    let params: any
    if (this.arrayids.length == 0) {
      alert("Select atleast one to update framework courses")
    } else {
      params = JSON.stringify({ program_id: this.program.value.id, application_questions: this.arrayids })

      let url = "program/assign-application-question-to-program"
      this.apiService.putDataWithToken(url, params, this.auth).subscribe((res) => {
        res;
        console.log("updated program questions", res)
        this.programquestions = res.application_questions;
        alert("Program Questions Updated Successfully")
        if (this.programquestions.length > 0) {
          this.getquestions();
          this.arrayids = []

        }
        console.log(res);
      })
    }



  }

  //get program questions
  getquestions() {
    let url = "show-application-questions-by-program"
    let params = JSON.stringify({ program_id: this.program.value.id })
    this.apiService.putDataWithToken(url, params, this.auth).subscribe((res) => {
      res;
      this.programquestions = res;
      console.log("programques", this.programquestions)
      this.removeduplicates();
    })

  }
  // removing duplicate questions
  removeduplicates() {
    let qestarray = Object.assign([], this.allquestions)
    var i = qestarray.length;
    if (this.programquestions.length > 0) {
      while (i--) {
        for (var j of this.programquestions) {
          if (qestarray[i] && qestarray[i].id == j.id) {
            // this.courses1.push(this.courses[i])
            qestarray.splice(i, 1)
          }
        }
        this.displayallques = qestarray


      }
    } else {
      this.displayallques = qestarray
    }

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
