import { Component, OnInit } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';

@Component({
  selector: 'app-programsregistration',
  templateUrl: './programsregistration.component.html',
  styleUrls: ['./programsregistration.component.css']
})
export class ProgramsRegistrationComponent implements OnInit {
 
  constructor(private apiService: ApiCommunicationService) { }

  ngOnInit() {
    // this.getAllProgram();
  }

  handleFormSubmit(form){
    debugger
  }
  
//   getAllProgram(){
//     this.apiService.getDataWithoutAuth('get-list-of-programs')
//     .subscribe(data => {
//       this.allPrograms = data;
//       this.livePrograms = data.all_programs.live;
//       this.expPrograms = data.all_programs.exp;
//       debugger
//       console.log(`All programs: ${this.allPrograms}`);
//       console.log(`live programs: ${data.all_programs.live}`);
//       console.log(`exp programs: ${data.all_programs.exp}`);

//     }, error =>{
//       console.log(`The following error has been occured: ${error}`)

//     })
//   }

}
