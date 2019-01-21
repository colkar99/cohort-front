import { Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  error: any
  constructor() { }

  ngOnInit() {
  }
  openpopup(err) {
    this.error = err
    $("#errmodal").modal({
      backdrop: "static",
      keyboard: false
    }, "show")
  }
  closepopup() {
    $("#errmodal").modal('hide')
  }

}
