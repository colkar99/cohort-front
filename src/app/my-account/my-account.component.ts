import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../shared-data.service'
import { ApiCommunicationService } from '../api-communication.service'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
declare var $: any;
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  authToken: any
  loggedIn: any
  user: any = {};
  resetmail: string
  imageSrc: any
  imageurl: any = "assets/avatar_2x.png"
  constructor(private sharedservice: SharedDataService,
    private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router) {

  }

  ngOnInit() {
    this.authToken = this.getCookie('Authorization')
    if (this.authToken.length != 0) {
      this.loggedIn = true;
      this.getUserdetails()
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
  }

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
    this.user.user_main_image = this.imageSrc;
  }

  getCookie(key: string) {
    return this.cookieService.get(key)
  }
  getUserdetails() {
    let url = "profile/get-user-details"
    this.apiCom.getDataWithAuth(url, this.authToken).subscribe((res) => {
      res;
      console.log(res)
      this.user = res
      if (this.user.user_main_image.url == (null || undefined)) {
        this.imageurl = "assets/avatar_2x.png"
      } else {
        this.imageurl = this.apiCom.imgUrl + this.user.user_main_image.url
      }
      if (this.user.mentor_user != (null && undefined)) {
        if (this.user.facebook_link == "" || this.user.facebook_link == (null || undefined)) {
          this.user.facebook_link = this.user.mentor_user.facebook_url
        }
        if (this.user.linkedin_link == "" || this.user.linkedin_link == (null || undefined)) {
          this.user.linkedin_link = this.user.mentor_user.linked_in_url
        }
      }
    })
  }

  updateAccount() {
    if (this.user.mentor_user != (null && undefined)) {
      if (this.user.facebook_link == "" || this.user.facebook_link == (null || undefined)) {
        this.user.facebook_link = this.user.mentor_user.facebook_url
      } else {
        this.user.mentor_user.facebook_url = this.user.facebook_link
      }
      if (this.user.linkedin_link == "" || this.user.linkedin_link == (null || undefined)) {
        this.user.linkedin_link = this.user.mentor_user.linked_in_url
      } else {
        this.user.mentor_user.linked_in_url = this.user.linkedin_link
      }
    }
    let params: any
    if (this.user.mentor_user != (null && undefined)) {
      let mentor_user = Object.assign({}, this.user.mentor_user)

      // delete this.user["mentor_user"]
      params = JSON.stringify({ user: this.user, mentor_user: mentor_user })

    } else {
      params = JSON.stringify({ user: this.user })
    }
    let url = "profile/update-user-account"

    this.apiCom.putDataWithToken(url, params, this.authToken).subscribe((res) => {
      res;
      console.log("response", res);
      this.user = res;
      if (this.user.user_main_image.url == (null || undefined)) {
        this.imageurl = "assets/avatar_2x.png"
      } else {
        this.imageurl = this.apiCom.imgUrl + this.user.user_main_image.url
      }
      alert("Account Updated Successfully")
    })
  }
  changepwd() {
    console.log("hello")
    $("#passchange").modal('show');
    this.resetmail = this.user.email
  }
  submitpwd() {
    let url = "password-reset-link"
    let params = JSON.stringify({ user: { email: this.resetmail } })
    this.apiCom.putDataWithoutToken(url, params).subscribe((res) => {
      res;
      if (res) {
        alert("Reset link has been sent to your email id");
        $("#passchange").modal('hide')
      }
    })
  }
  closepwd() {
    this.resetmail = undefined
    $("#passchange").modal('hide')
  }
  changepic() {
    document.getElementById('user_main_image').click();
  }

}
