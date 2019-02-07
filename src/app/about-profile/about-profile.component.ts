import { Component, OnInit } from '@angular/core';
import {SharedDataService} from '../shared-data.service'
@Component({
  selector: 'app-about-profile',
  templateUrl: './about-profile.component.html',
  styleUrls: ['./about-profile.component.css']
})
export class AboutProfileComponent implements OnInit {
  startupdata:any = {}
  companylogo: any = "assets/photo.png"
  CompanyName: any = "PETRAS"
  Mentors: any = "Stanly,Selwyn"
  bio: any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns). Three Equal Columns Using Numbers. You can also use numbers to control the column width."
  currentstate:any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns)"
  constructor(private sharedservice:SharedDataService) {
    this.sharedservice.currentMessage.subscribe((res)=>{res;this.startupdata = res;})
    console.log("startupdata",this.startupdata)
   }

  ngOnInit() {
  }

}
