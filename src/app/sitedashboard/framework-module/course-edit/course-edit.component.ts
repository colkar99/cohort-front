import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ErrorDisplayComponent } from '../../../error-display/error-display.component'
import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from '../../../shared-data.service'
declare var $: any
@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  course_id: number;
  course: any = {};
  allActivity: any;
  framework_activity: any;
  @ViewChild(ErrorDisplayComponent) errdisplay;
  activitiesarray: Array<any> = []
  checklistforms: FormGroup;
  checklists: FormGroup
  activity: any = {}
  btnname: any
  deletedisplay: string
  deleteindex: any
  deleteactivityid: any

  public user_details: any[];
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedservice: SharedDataService,
    private formBuilder: FormBuilder) {
    this.checklistforms = this.formBuilder.group({
      id: undefined,
      name: '',
      description: '',
      placeholder: '',
      order: '',
      // checklists: this.formBuilder.array([])

    })
    this.checklists = this.formBuilder.group({
      id: undefined,
      name: '',
      description: '',
      
    })
  }


  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.course_id = +this.route.snapshot.paramMap.get('id')
    console.log("course_id", this.course_id)
    if (this.course_id != (0 && null && undefined)) {
      this.sharedservice.currentMessage.subscribe(message => this.course = message)
      // this.getcourses(this.course_id)
      // this.getcoursesActivities(this.course_id);
    }


    this.getUserDetails();
  }
  getcourses(id: number) {
    let url = "framework/show-course";
    let data = { course: { id: id } };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.course = data;
      }, error => {
        console.log(error);
        alert(`the following error has happend`);
      })
  }
  getAllActivities() {
    let url = "framework/course/show-all-activities";
    this.apiCom.getDataWithAuth(url, this.authToken)
      .subscribe(data => {
        console.log(data);
        this.allActivity = data;
      }, error => {
        console.log(error);
      })
  }
  getcoursesActivities(id: number) {
    let url = "framework/course/show-activity";
    let data = { course: id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.framework_activity = data;
      }, error => {
        console.log(error);
      })
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
  deleteform() {
    let url = "framework/course/delete-course-activity-and-checklists"
    let params = { "course_id": this.course.id }
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      alert("Courses Deleted Successfully");
      this.router.navigate(['admin/dashboard/framework'])
    })
  }

  updateForm() {

    let url = "framework/course/create-and-update-course"
    this.apiCom.postDataWithToken(url, JSON.stringify({ course: this.course }), this.authToken).subscribe((res) => {
      res;
      this.course = res;
      this.errdisplay.openpopup("Success!!!", "Course created Successfully")
    }, (err: HttpErrorResponse) => {
      this.errdisplay.openpopup("Error!!!", err)
    })

  }

  // createchecklistitems(): FormGroup {
  //   return this.formBuilder.group({
  //     id: undefined,
  //     name: '',
  //     description: ''
  //   })
  // }
  // updatechecklistsitems(item): FormGroup {
  //   return this.formBuilder.group({
  //     id: item.id,
  //     name: item.name,
  //     description: item.description
  //   })
  // }

  // addItem(): void {
  //   this.checklists = this.checklistforms.get('checklists') as FormArray;
  //   this.checklists.push(this.createchecklistitems());
  // }
  // deleteItem(i) {
  //   this.btnname = "checklist"
  //   console.log("id", this.checklists.controls[i].value)
  //   this.checklists = this.checklistforms.get('checklists') as FormArray;
  //   this.deleteindex = i
  //   this.deletedisplay = "Are you Sure, You want to delete the checklist?"
  //   let id = this.checklists.controls[i].value.id
  //   if (id != (null && undefined)) {
  //     $("#deletepopup").modal('show')
  //   } else {
  //     this.checklists.removeAt(i);
  //   }
  //   // 
  // }
  viewchecklists(item){
    console.log(item)
    $("#checklistmodal").modal('show')
    this.checklists.get('name').setValue(item.name)
    this.checklists.get('id').setValue(item.id)
    this.checklists.get('description').setValue(item.description)
    
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
    // this.checklistforms.setControl('checklists', this.formBuilder.array([]));
    // this.checklists = this.checklistforms.get('checklists') as FormArray;
    // const controlArray = <FormArray>this.checklistforms.get('formitems');


    // this.formitems = this.checklistforms.get('formitems') as FormArray;
    // for (let i = 0; i < item.checklists.length; i++) {
    //   controlArray.controls[i].get('name').setValue(item.checklists[i].name);
    //   controlArray.controls[i].get('description').setValue(item.checklists[i].description);
    //   controlArray.controls[i].get('id').setValue(item.checklists[i].id);
    // }
    // for (let i = 0; i < item.checklists.length; i++) {

    //   console.log("values", this.updatechecklistsitems(item.checklists[i]))
    //   this.checklists.push(this.updatechecklistsitems(item.checklists[i]));
    // }
    // this.checklists = this.checklistforms.get('checklists') as FormArray;



    //item.checklists.forEach(task => { 
    //   this.checklistforms.items.push(
    //     this.formBuilder.group({
    //       name: [task.name],
    //       description:[task.description]
    //     })
    //   );
    // });

  }
  addchecklists(){
    $("#checklistmodal").modal('show')
    this.checklists = this.formBuilder.group({
      id: undefined,
      name: '',
      description: ''
      
      // checklists: this.formBuilder.array([this.createchecklistitems()])

    })
  }
  addactivities() {
    $("#activitiesmodal").modal('show')
    this.checklistforms = this.formBuilder.group({
      id: undefined,
      name: '',
      description: '',
      placeholder: '',
      order: '',
      // checklists: this.formBuilder.array([this.createchecklistitems()])

    })
  }
  savechecklists(checklists){
    let values = checklists.value
    if (values.id == (null || undefined)) {
      let url = "framework/course/create-update-checklist"
      this.apiCom.postDataWithToken(url, JSON.stringify({ checklist: values, course_id: this.course.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.course = res;
        alert("Course Checklists Saved Successfully")
        $("#checklistmodal").modal('hide')

      })
    } else {
      let url = "framework/course/create-update-checklist"
      this.apiCom.postDataWithToken(url, JSON.stringify({ checklist: values, course_id: this.course.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.course = res;
        alert("Course Activities and Checklists Updated Successfully")
        $("#checklistmodal").modal('hide')

      })
    }
  }
  saveActivities(checklistforms) {
    console.log("values", checklistforms)
    let values = checklistforms.value
    // for(let i = 0; i < values.checklists.length;i++){
    //   if(values.checklists[i].id == (null || undefined)){
    //     delete values.checklists[i].id
    //   }
    // }
    if (values.id == (null || undefined)) {
      let url = "framework/course/create-activity"
      this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, course_id: this.course.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.course = res;
        alert("Course Activities Saved Successfully")
        $("#activitiesmodal").modal('hide')

      })
    } else {
      let url = "framework/course/create-activity"
      this.apiCom.postDataWithToken(url, JSON.stringify({ activity: values, course_id: this.course.id }), this.authToken).subscribe((res) => {
        res;
        console.log("response", res)
        this.course = res;
        alert("Course Activities Updated Successfully")
        $("#activitiesmodal").modal('hide')

      })
    }



  }
  closeactivities() {
    $("#activitiesmodal").modal('hide')
  }
  closechecklists() {
    $("#checklistmodal").modal('hide')
  }

  confirmdelete() {
    if (this.btnname == "checklist") {
      let url = "framework/course/delete-checklist";
      let params = JSON.stringify({ checklist_id: this.deleteactivityid })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res
        this.course.checklists.splice(this.deleteindex, 1)
        $("#deletepopup").modal('hide')
        alert("Checklist Deleted Successfully")
      }, (error) => {
        alert(error)
      })
    } else if (this.btnname == "activity") {
      let url = "framework/course/delete-activity";
      let params = JSON.stringify({ activity_id: this.deleteactivityid, course_id: this.course.id })
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        res
        this.course.activities.splice(this.deleteindex, 1)
        $("#deletepopup").modal('hide')
        alert("Activity Deleted Successfully")
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
  deletechecklists(id, i) {
    $("#deletepopup").modal('show')
    this.btnname = "checklist"
    this.deletedisplay = "Are you sure, You want to delete this checklist?"
    this.deleteindex = i;
    this.deleteactivityid = id
  }

}
