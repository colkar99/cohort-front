import { Component, OnInit } from '@angular/core';
declare var $: any
@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  error: any
  Header:any
  constructor() { }

  ngOnInit() {
  }
  openpopup(header,err) {
    this.error = err
    this.Header = header
    $("#errmodal").modal({
      backdrop: "static",
      keyboard: false
    }, "show")
  }
  closepopup() {
    $("#errmodal").modal('hide')
  }

}
