import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup-updates',
  templateUrl: './startup-updates.component.html',
  styleUrls: ['./startup-updates.component.css']
})
export class StartupUpdatesComponent implements OnInit {
  status:string = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  constructor() { }

  ngOnInit() {
  }

}
