import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiCommunicationService } from '../api-communication.service';
import { Router, ActivatedRoute } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  id: any
  resetpwd = new FormGroup({

    
    newpassword: new FormControl(null, Validators.required),
    confirmpassword: new FormControl(null, Validators.required)
  });
  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    if (this.id != (0 && null && undefined)) {
      let url = "cohort/get-user"
      let params = JSON.stringify({ user: { id: this.id } })
      this.apiCom.postData(url, params).subscribe((res) => {
        res;
        console.log(res)
        if (res.is_first_time_logged_in == true) {

        } else {
          this.router.navigate(['login'])
        }
      })
    } else {
      this.router.navigate(['login'])
    }
  }

  changepwd(values) {
    console.log(values.value)
    let value = values.value
    let url = "password-reset"
    let params = JSON.stringify({user:{id:this.id,password:value.newpassword,password_confirmation:value.confirmpassword}})

    console.log(params)
    if(value.newpassword == value.confirmpassword){
      this.apiCom.putDataWithoutToken(url,params).subscribe((res)=>{
        res;
        if(res){
          alert("Password Changed Successfully");
          this.router.navigate(['login'])
        }
      })
    }else{
      alert("New password and Confirm password Mismatch")
    }
    
  }

}
