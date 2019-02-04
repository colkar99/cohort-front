import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startupdashboard',
  templateUrl: './startupdashboard.component.html',
  styleUrls: ['./startupdashboard.component.css']
})
export class StartupdashboardComponent implements OnInit {
  companylogo: any = "assets/photo.png"
  CompanyName: any = "PETRAS"
  Mentors: any = "Stanly,Selwyn"
  bio: any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns). Three Equal Columns Using Numbers. You can also use numbers to control the column width."
  currentstate:any = "Bootstrap 4 Grid Examples. Three Equal Columns. Use the .col class on a specified number of elements and Bootstrap will recognize how many elements there are (and create equal-width columns)"
  constructor() { }

  ngOnInit() {
  }

}
