import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../api-communication.service';
declare var $: any

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  allPrograms: any[] = [];
  livePrograms: any[] = [];
  expPrograms: any[];
  imageBaseUrl: string;
  constructor(private apiService: ApiCommunicationService) {
    this.imageBaseUrl = this.apiService.imgUrl;
   }

  ngOnInit() {
    this.getAllProgram();
  }
  
  getAllProgram(){
    this.apiService.getDataWithoutAuth('get-list-of-programs')
    .subscribe(data => {
      this.allPrograms = data;
      this.livePrograms = data.all_programs.live;
      this.expPrograms = data.all_programs.exp;
      debugger
      console.log(`All programs: ${this.allPrograms}`);
      console.log(`live programs: ${data.all_programs.live}`);
      console.log(`exp programs: ${data.all_programs.exp}`);

    }, error =>{
      console.log(`The following error has been occured: ${error}`)

    })
  }


}
