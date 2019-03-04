import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ErrorDisplayComponent } from '../../error-display/error-display.component'
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any
import { SharedDataService } from '../../shared-data.service'
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-create-program-sessions',
  templateUrl: './create-program-sessions.component.html',
  styleUrls: ['./create-program-sessions.component.css']
})
export class CreateProgramSessionsComponent implements OnInit {
  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  session_id: number;
  session: any = {};
  allActivity: any;
  framework_activity: any;
  @ViewChild(ErrorDisplayComponent) errdisplay;
  program_id: any
  session_attendees: any
  startuplist: any
  btnname: any
  deletedisplay: string
  deleteindex: any
  deleteactivityid: any
  arrayids: Array<any> = []
  allattendees: any = {}
  startups: any
  arrayids1: Array<any> = []
  arrayids2: Array<any> = []



  public user_details: any[];

  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedservice: SharedDataService) {

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
    this.program_id = this.getCookie('program_id')
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.session_id = +this.route.snapshot.paramMap.get('id')
    console.log("frameworkid", this.session_id)
    if (this.session_id != (0 && null && undefined)) {
      this.getSession(this.session_id)
      this.sharedservice.currentMessage.subscribe((res) => this.session = res)
      this.session.start_date_time = new Date(this.session.start_date_time).toISOString().slice(0, 16)
      this.session.end_date_time = new Date(this.session.end_date_time).toISOString().slice(0, 16)

    }

    this.getmentors();
    this.getUserDetails();
  }
  getSession(id: number) {
    let url = "program/get-session-attendees";
    let data = { session: { id: id } };
    this.apiCom.putDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log("session_attendees", data);
        this.session_attendees = data;
      }, error => {
        console.log(error);
        alert(`the following error has happend`);
      })
  }
  getmentors() {
    let url = "program/get-programs-related-users";
    let data = { program_id: this.program_id }
    this.apiCom.putDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.allattendees = data;

        this.removeduplicates();

      }, error => {
        console.log(error);
      })
  }
  getstartups() {
    let url = "startup/show-profiles-for-admin"
    let data = { "program_id": this.program_id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        debugger
        console.log(data);
        this.startuplist = data;
        console.log("this.allStartups" + this.startuplist)

      }, error => {
        console.log(error);
      })
  }
  
  updateForm() {
    if (this.session.id == (null || undefined)) {
      let url = "program/create-session"
      this.session.program_id = this.program_id
      this.session.start_date_time = new Date(this.session.start_date_time)
      this.session.end_date_time = new Date(this.session.end_date_time)
      console.log(this.session)
      this.apiCom.postDataWithToken(url, JSON.stringify({ session: this.session }), this.authToken).subscribe((res) => {
        res;
        console.log(res)
        this.session = res;
        this.session.start_date_time = new Date(this.session.start_date_time).toISOString().slice(0, 16)
        this.session.end_date_time = new Date(this.session.end_date_time).toISOString().slice(0, 16)
        this.errdisplay.openpopup("Success!!!", "Session created Successfully")
      }, (err: HttpErrorResponse) => {
        this.errdisplay.openpopup("Error!!!", err)
      })
    } else {

      let url = "program/edit-session"
      this.apiCom.putDataWithToken(url, JSON.stringify({ session: this.session }), this.authToken).subscribe((res) => {
        res;
        this.session = res;
        console.log(res)
        this.session.start_date_time = new Date(this.session.start_date_time).toISOString().slice(0, 16)
        this.session.end_date_time = new Date(this.session.end_date_time).toISOString().slice(0, 16)
        this.errdisplay.openpopup("Success!!!", "Session Updated Successfully")
      }, (err: HttpErrorResponse) => {
        this.errdisplay.openpopup("Error!!!", err)
      })
    }
  }
  deleteform() {
    let url = "program/delete-session"
    this.apiCom.putDataWithToken(url, JSON.stringify({ session: { id: this.session.id } }), this.authToken).subscribe((res) => {
      res;

      alert("Program Session Deleted Successfully")
      this.router.navigate(['admin/dashboard/program-sessions'])
    }, (err: HttpErrorResponse) => {
      alert(err)
    })
  }
  deleteAttendees(item, i) { 
      this.deletementors(item, i);
      $("#deletepopup").modal('show')
  }

  confirmdelete() {
    
      let url = "program/remove-attendee-from-session"
      let params = JSON.stringify({ session_id: this.session.id, user_id: this.deleteactivityid })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log("response", res);
        alert("Session Attendee Deleted Successfully")
        //this.getmentors();
        this.session_attendees.splice(this.deleteindex, 1)
      })
   
    
    $("#deletepopup").modal('hide')
  }
  closedelete() {
    $("#deletepopup").modal('hide')
  }

  

  selectvalues(checked, value) {
    if (checked == true) {
      this.arrayids.push(value.startup_users.id);
    } else {
      if (checked == false) {
        let deleteindex = this.arrayids.indexOf(value.startup_users.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayids.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.arrayids)
        }
      }
    }
  }

  selectvalues1(checked, value) {
    if (checked == true) {
      this.arrayids1.push(value.id);
    } else {
      if (checked == false) {
        let deleteindex = this.arrayids1.indexOf(value.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayids1.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.arrayids1)
        }
      }
    }
  }
  selectvalues2(checked, value) {
    if (checked == true) {
      this.arrayids2.push(value.id);
    } else {
      if (checked == false) {
        let deleteindex = this.arrayids2.indexOf(value.id)
        console.log(deleteindex)
        if (deleteindex != -1) {
          this.arrayids2.splice(deleteindex, 1)
          console.log("this.formrequestarray", this.arrayids2)
        }
      }
    }
  }
  deletementors(item, i) {
   
    this.deletedisplay = "Are you sure, You want to delete this Attendee?"
    this.deleteindex = i;
    this.deleteactivityid = item.id

  }
  deletestartups(item, i) {
    this.btnname = "startup"
    this.deletedisplay = "Are you sure, You want to delete this mentor?"
    this.deleteindex = i;
    this.deleteactivityid = item.id

  }
  updateProgramSession() {
    let params: any
    if (this.arrayids.length == 0 && this.arrayids1.length == 0 && this.arrayids2.length == 0) {
      alert("Select atleast one Startup or one Mentor or One Site User to Update Attendees")
    } else {
      params = JSON.stringify({ session: { id: this.session.id }, startups: this.arrayids, mentors: this.arrayids1, site_users: this.arrayids2 })

      let url = "program/assign-attendess-for-session"
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;


        this.getSession(this.session.id);
        this.arrayids = []
        this.arrayids1 = []
        this.arrayids2 = []
        alert(res.message)
        console.log(res);
        $("#attendee").modal('hide')
      })
    }

  }

  removeduplicates() {
    let item1 = this.session_attendees.filter((list) => list.user_type == "startup")
    let item2 = this.session_attendees.filter((list) => list.user_type == "mentor")
    let item3 = this.session_attendees.filter((list) => list.user_type == "site")

    if (item1.length > 0) {
      var i = this.allattendees.startup_users.length;
      while (i--) {
        for (var j of item1) {
          if (this.allattendees.startup_users[i].startup_users && this.allattendees.startup_users[i].startup_users.id == j.id) {
            // this.courses1.push(this.courses[i])
            this.allattendees.startup_users.splice(i, 1);

          }
        }
      }
    }
    if (item2.length > 0) {
      var i = this.allattendees.mentors.length;
      while (i--) {
        for (var j of item2) {
          if (this.allattendees.mentors[i] && this.allattendees.mentors[i].id == j.id) {
            // this.courses1.push(this.courses[i])
            this.allattendees.mentors.splice(i, 1);

          }
        }
      }
    }
    if (item3.length > 0) {
      var i = this.allattendees.site_users.length;
      while (i--) {
        for (var j of item3) {
          if (this.allattendees.site_users[i] && this.allattendees.site_users[i].id == j.id) {
            // this.courses1.push(this.courses[i])
            this.allattendees.site_users.splice(i, 1);

          }
        }
      }
    }


  }


  removeduplicates1() {
    var i = this.startuplist.length;
    while (i--) {
      for (var j of this.session.startups) {
        if (this.startuplist[i] && this.startuplist[i].id == j.id) {
          // this.courses1.push(this.courses[i])
          this.startuplist.splice(i, 1);

        }
      }
    }


  }
  addattendees() {
    $("#attendee").modal('show');
    this.getmentors();
  }
  closeattend() {
    $("#attendee").modal('hide')
  }

}
