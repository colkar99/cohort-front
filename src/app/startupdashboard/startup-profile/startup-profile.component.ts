import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any
import { sharingData } from '../../sharingdata'
@Component({
  selector: 'app-startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrls: ['./startup-profile.component.css']
})
export class StartupProfileComponent implements OnInit {
  startupid: any
  authToken: any
  startupprofile: any = {}
  funding: any = {}
  editprofile: boolean = false
  user: any = {}
  socialedit:boolean = false
  constructor(private apiCom: ApiCommunicationService, public sharedata: sharingData,
    private router: Router,
    private cookieService: CookieService) {
    this.startupid = this.getCookie('startup_profile_id');
    this.authToken = this.getCookie('Authorization');
  }

  ngOnInit() {
    let url = "startup/show-profile";
    let params = JSON.stringify({ startup_profile: { id: this.startupid } })
    this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log("responseprofile",res);
      this.startupprofile = res;
    })
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  addfunding() {
    $("#fundpopup").modal('show');
    this.funding = {}
    this.funding.startup_profile_id = parseInt(this.startupid)
  }
  savefunding() {

    if (this.funding.id == (null || undefined)) {
      let url = "startup-profile/founding-source/create";
      let params = JSON.stringify({ founding_source: this.funding })
      console.log(params)
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log(res);
        this.startupprofile.founding_sources = res;
        alert("Funding Created Successfully")
        $("#fundpopup").modal('hide');

      }, (err: HttpErrorResponse) => {
        alert(err)
      })
    } else {
      let url = "startup-profile/founding-source/edit";
      let params = JSON.stringify({ founding_source: this.funding })
      console.log(params)
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log(res);
        this.startupprofile.founding_sources = res;
        alert("Funding Updated Successfully")
        $("#fundpopup").modal('hide');

      }, (err: HttpErrorResponse) => {
        alert(err)
      })
    }


  }
  viewfunding(item, i) {
    $("#fundpopup").modal('show');
    this.funding = item

  }
  closefunding() {
    $("#fundpopup").modal('hide');
  }

  deletefunding(item, i) {
    if (item.id != (null && undefined)) {
      let url = "startup-profile/founding-source/delete"
      let params = JSON.stringify({ founding_source: { id: parseInt(item.id) } })

      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log(res)
        this.startupprofile.founding_sources = res;
        alert("Funding Source Deleted Successfully")
      })

    } else {
      this.startupprofile.founding_sources.splice(i, 1)
    }
  }

  submitprofile() {
    console.log(this.startupprofile)
    let url = "startup/edit-startup-profile"
    let params = JSON.stringify({ startup_profile: this.startupprofile });
    this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log(res)
      alert("Profile Updated Successfully")
      this.startupprofile = res;
      this.sharedata.startupprofile = res;
    }, ((err: HttpErrorResponse) => {
      alert(err)
    }))
  }
  adduser() {
    $("#userpopup").modal('show')
    this.user = {}
  }
  saveuser() {
    if (this.user.id == (null || undefined)) {
      let url = "startup/create-team-member"
      let params = JSON.stringify({ user: this.user, startup_profile_id: this.startupprofile.id })
      this.apiCom.postDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        console.log("user", res);
        this.startupprofile.users = res.startup_users
        this.sharedata.startupprofile = this.startupprofile
        alert("User Created Successfully")
        $("#userpopup").modal('hide')

      }, ((err) => {
        alert(err)
      }))
    } else {
      let url = "startup/edit-team-member"
      let params = JSON.stringify({ user: this.user, startup_profile_id: this.startupprofile.id })
      this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
        res;
        alert("User Updated Successfully")
        $("#userpopup").modal('hide')
      }, ((err) => {
        alert(err)
      }))
    }
  }
  viewuser(item, i) {
    $("#userpopup").modal('show')
    this.user = item
  }
  closeuser() {
    $("#userpopup").modal('hide')
  }
  deleteuser() {
    let url = "startup/delete-team-member"
    let params = JSON.stringify({ startup_profile_id: this.startupprofile.id, user: { id: this.user.id } })
    this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log(res);
      this.startupprofile.users = res.startup_users
      this.sharedata.startupprofile = this.startupprofile
      alert("User Deleted Successfully")
      $("#userpopup").modal('hide')
    })
  }

  submitsocial(){
    this.socialedit = false
  }

}
