import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ApiCommunicationService } from '../api-communication.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { CurrentstateFormVO } from '../CurrentStateFormVO'
import { ErrorDisplayComponent } from '../error-display/error-display.component'

@Component({
  selector: 'app-current-state-form',
  templateUrl: './current-state-form.component.html',
  styleUrls: ['./current-state-form.component.css']
})


export class CurrentStateFormComponent implements OnInit {
  id: number
  splitstring: string
  url: string = "get-application-current-form-data"
  startupdata: any = {}
  currentstateform: CurrentstateFormVO
  @ViewChild(ErrorDisplayComponent) errdisplay

  constructor(@Inject(DOCUMENT) private document: any, private service: ApiCommunicationService, private router: Router) {
    console.log(location.pathname);
    let path: string = location.pathname
    let name = path.split('/');
    this.splitstring = name[name.length - 1]
    console.log("id:", this.splitstring)
    this.currentstateform = new CurrentstateFormVO()



  }

  ngOnInit() {
    this.service.postDataCFSI(this.url, this.splitstring).subscribe((res) => {
      res;
      this.startupdata = res;
      console.log("startupdata", this.startupdata)
      if (this.startupdata.application_status == "CSFI") {
        this.currentstateform = new CurrentstateFormVO()
        this.currentstateform.program_id = this.startupdata.program_id
        this.currentstateform.startup_registration_id = this.startupdata.id
      } else {
        this.router.navigate(['/'])
      }

    }, (err: HttpErrorResponse) => {
      alert(err)
    })
  }

  submitdata() {
    console.log("values", this.currentstateform)
    let currentstateform = { "current_state_form": this.currentstateform }
    console.log("finaldata", JSON.stringify(currentstateform))
    this.service.submitCurrentStateForm("startup-current-state-form-submission", currentstateform).subscribe((res) => {
      res;
      if (res) {
        alert("Current State Form Submitted Successfully")
        this.router.navigate(['/'])
      }
    }, (err: HttpErrorResponse) => {
      alert(err)
    })

  }

}
