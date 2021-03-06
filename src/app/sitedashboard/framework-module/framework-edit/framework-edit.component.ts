import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ErrorDisplayComponent } from '../../../error-display/error-display.component'
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any

@Component({
  selector: 'app-sitedashboard-framework-module-edit',
  templateUrl: './framework-edit.component.html',
  styleUrls: ['./framework-edit.component.css']
})
export class FrameworkModuleEditComponent implements OnInit {

  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  framework_id: number;
  framework: any = {};
  allActivity: any;
  framework_activity: any;
  @ViewChild(ErrorDisplayComponent) errdisplay;
  activitiesarray: Array<any> = []
  checklistforms: FormGroup;
  formitems: FormArray
  activity: any = {}
  btnname: any
  deletedisplay: string
  deleteindex: any
  deleteactivityid: any
  courses1: Array<any> = []
  arrayids: Array<any> = []
  courses: any
  main_image:string = "";
  thumb_image:string = "";
  imageSrc:string = "";
  imageBaseUrl:string = "";


  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.checklistforms = this.formBuilder.group({
      id: undefined,
      name: '',
      description: '',
      placeholder: '',
      order: '',
      formitems: this.formBuilder.array([])

    })
    this.imageBaseUrl = this.apiCom.imgUrl;
  }


  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  getUserDetails() {
    this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
      .subscribe(
        data => {
          console.log("success!", data);
          this.user_details = data;
        },
        error => console.error("couldn't post because", error)
      );
  }
  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.framework_id = +this.route.snapshot.paramMap.get('id')
    console.log("frameworkid", this.framework_id)
    if (this.framework_id != (0 && null && undefined)) {
      this.getframework(this.framework_id)

    }

    this.getcourses();
    this.getUserDetails();
  }
  getframework(id: number) {
    let url = "program/show-framework";
    let data = { framework: { id: id } };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.framework = data;
      }, error => {
        console.log(error);
        alert(`the following error has happend`);
      })
  }
  getcourses() {
    let url = "framework/course/view-all";
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        console.log(data);
        this.courses = data;

        this.removeduplicates();

      }, error => {
        console.log(error);
      })
  }
  getFrameworkActivities(id: number) {
    let url = "program/framework/show-activity";
    let data = { framework_id: id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.framework_activity = data;
      }, error => {
        console.log(error);
      })
  }
  updateForm() {
    if (this.framework.id == (null || undefined)) {
      this.framework.main_image = this.main_image;
      this.framework.thumb_image = this.thumb_image;
      let url = "program/create-framework"
      this.apiCom.postDataWithToken(url, JSON.stringify({ framework: this.framework }), this.authToken).subscribe((res) => {
        res;
        this.framework = res;
        this.errdisplay.openpopup("Success!!!", "FrameWork created Successfully")
      }, (err: HttpErrorResponse) => {
        this.errdisplay.openpopup("Error!!!", err)
      })
    } else {
      this.framework.main_image = this.main_image;
      this.framework.thumb_image = this.thumb_image;
      let url = "program/edit-framework"
      this.apiCom.putDataWithToken(url, JSON.stringify({ framework: this.framework }), this.authToken).subscribe((res) => {
        res;
        this.framework = res;
        this.errdisplay.openpopup("Success!!!", "FrameWork Updated Successfully")
      }, (err: HttpErrorResponse) => {
        this.errdisplay.openpopup("Error!!!", err)
      })
    }
  }
  deleteform() {
    let url = "program/delete-framework"
    this.apiCom.putDataWithToken(url, JSON.stringify({ framework: { id: this.framework.id } }), this.authToken).subscribe((res) => {
      res;

      alert("FrameWork Deleted Successfully")
      this.router.navigate(['admin/dashboard/framework'])
    }, (err: HttpErrorResponse) => {
      alert(err)
    })
  }

  createchecklistitems(): FormGroup {
    return this.formBuilder.group({
      id: undefined,
      name: '',
      description: ''
    })
  }
  updatechecklistsitems(item): FormGroup {
    return this.formBuilder.group({
      id: item.id,
      name: item.name,
      description: item.description
    })
  }

  addItem(): void {
    this.formitems = this.checklistforms.get('formitems') as FormArray;
    this.formitems.push(this.createchecklistitems());
  }
  deleteItem(i) {
    this.btnname = "checklist"
    console.log("id", this.formitems.controls[i].value)
    this.formitems = this.checklistforms.get('formitems') as FormArray;
    this.deleteindex = i
    this.deletedisplay = "Are you Sure, You want to delete the checklist?"
    let id = this.formitems.controls[i].value.id
    if (id != (null && undefined)) {
      $("#deletepopup").modal('show')
    } else {
      this.formitems.removeAt(i);
    }
    // 
  }

  viewactivities(item) {
    console.log(item)
    $("#activitiesmodal").modal('show')
    this.checklistforms.get('name').setValue(item.name)
    this.checklistforms.get('id').setValue(item.id)
    this.checklistforms.get('description').setValue(item.description)
    this.checklistforms.get('order').setValue(item.order)
    this.checklistforms.get('placeholder').setValue(item.placeholder)
    //this.checklistforms.get('formitems').setValue(item.checklists)
    this.checklistforms.setControl('formitems', this.formBuilder.array([]));
    this.formitems = this.checklistforms.get('formitems') as FormArray;
    const controlArray = <FormArray>this.checklistforms.get('formitems');


    // this.formitems = this.checklistforms.get('formitems') as FormArray;
    // for (let i = 0; i < item.checklists.length; i++) {
    //   controlArray.controls[i].get('name').setValue(item.checklists[i].name);
    //   controlArray.controls[i].get('description').setValue(item.checklists[i].description);
    //   controlArray.controls[i].get('id').setValue(item.checklists[i].id);
    // }
    for (let i = 0; i < item.checklists.length; i++) {

      console.log("values", this.updatechecklistsitems(item.checklists[i]))
      this.formitems.push(this.updatechecklistsitems(item.checklists[i]));
    }
    this.formitems = this.checklistforms.get('formitems') as FormArray;



    //item.checklists.forEach(task => { 
    //   this.checklistforms.items.push(
    //     this.formBuilder.group({
    //       name: [task.name],
    //       description:[task.description]
    //     })
    //   );
    // });

  }

  addactivities() {
    $("#activitiesmodal").modal('show')
    this.checklistforms = this.formBuilder.group({
      id: undefined,
      name: '',
      description: '',
      placeholder: '',
      order: '',
      formitems: this.formBuilder.array([this.createchecklistitems()])

    })
  }
  saveActivities(checklistforms) {
    console.log("values", checklistforms)
    let values = checklistforms.value
    if (values.id == (null || undefined)) {
      let url = "program/framework/create-activity-and-checklists"
      this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, checklists: values.formitems, framework_id: this.framework.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.framework = res;
        alert("Framework Activities and Checklists Saved Successfully")
        $("#activitiesmodal").modal('hide')

      })
    } else {
      let url = "program/framework/update-activity-and-checklists"
      this.apiCom.putDataWithToken(url, JSON.stringify({ activity: values, checklists: values.formitems, framework_id: this.framework.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.framework = res;
        alert("Framework Activities and Checklists Updated Successfully")
        $("#activitiesmodal").modal('hide')

      })
    }



  }
  closeactivities() {
    $("#activitiesmodal").modal('hide')
  }

  confirmdelete() {
    if (this.btnname == "checklist") {
      this.formitems = this.checklistforms.get('formitems') as FormArray;
      let id = this.formitems.controls[this.deleteindex].value.id
      let url = "program/framework/activity/delete-checklist";
      let params = JSON.stringify({ checklist: { id: id } })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res
        this.formitems.removeAt(this.deleteindex)
        $("#deletepopup").modal('hide')
        alert("Checklist Deleted Successfully")
      }, (error) => {
        alert(error)
      })
    } else if (this.btnname == "activity") {
      let url = "program/framework/delete-activity";
      let params = JSON.stringify({ activity_id: this.deleteactivityid, framework_id: this.framework.id })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res
        this.framework.activities.splice(this.deleteindex, 1)
        $("#deletepopup").modal('hide')
        alert("Checklist Deleted Successfully")
      }, (error) => {
        alert(error)
      })
    }
  }
  closedelete() {
    $("#deletepopup").modal('hide')
  }

  deleteactivities(id, i) {
    $("#deletepopup").modal('show')
    this.btnname = "activity"
    this.deletedisplay = "Are you sure, You want to delete this activity and its checklists?"
    this.deleteindex = i;
    this.deleteactivityid = id
  }

  setvalues(checked, value) {
    if (checked == true) {
      this.arrayids.push(value.id);
    } else {
      if (checked == false) {
        let deleteindex = this.arrayids.indexOf(value.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayids.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.arrayids)
        }
      }
    }
  }
  deletecoursesitems(item, i) {
    let url = "program/delete-course-with-framework"
    let params = JSON.stringify({ framework_id: this.framework.id, course_id: item.id })
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log("response", res);
      alert("Framework Course Deleted Successfully")
      this.getcourses();
      this.framework.courses.splice(i, 1)
    })
  }
  updateframeworkcourses() {
    let params: any
    if (this.arrayids.length == 0) {
      alert("Select atleast one to update framework courses")
    } else {
      params = JSON.stringify({ framework_id: this.framework.id, course_ids: this.arrayids })

      let url = "program/merge-courses-with-framework"
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        this.framework = res;
        alert("Framework Courses Updated Successfully")
        if (this.framework.courses.length > 0) {
          this.getcourses();
          this.arrayids = []

        }
        console.log(res);
      })
    }



  }

  removeduplicates() {
      var i = this.courses.length;
      while (i--) {
        for (var j of this.framework.courses) {
          if (this.courses[i] && this.courses[i].id == j.id) {
           // this.courses1.push(this.courses[i])
            this.courses.splice(i, 1);
            
          }
        }
      }
    
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
        this.thumb_image = this.imageSrc
    }
    // this.user.value.user.user_main_image = this.imageSrc;
  }
}
