import { Component, OnInit,NgZone } from '@angular/core';
import { ApiCommunicationService } from '../../api-communication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {SharedDataService} from '../../shared-data.service'
declare var $: any
declare var gapi: any;
@Component({
  selector: 'app-program-sessions',
  templateUrl: './program-sessions.component.html',
  styleUrls: ['./program-sessions.component.css']
})
export class ProgramSessionsComponent implements OnInit {

  message: any
  getUserUrl: string = 'get-user-details'
  authToken: string;
  loggedIn: boolean;
  livePrograms: any;
  expPrograms: any
  public user_details: any[];
  allPrograms: any[];
  allStartups: any[];
  startup: any;
  appRespQues: any;
  showStartup: boolean = false;
  location_program_id: any;
  formrequestarray: Array<any> = []
  programselected
  unfilteredvalue: any = []
  filterfeild
  filtervalue
  googleCalEvent: Array<any>;
  calLoggedin: boolean;
  current_session: any;
  current_users: any;
  curret_event_id: string;


  constructor(private apiCom: ApiCommunicationService,
    private cookieService: CookieService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private zone: NgZone
    ) { }

    // newMessage() {
    //   this.sharedDataService.changeMessage('Hello World');
    // }  
  getCookie(key: string) {
    return this.cookieService.get(key);
  }

  getUserDetails() {
    this.apiCom.getDataWithAuth(this.getUserUrl, this.authToken)
      .subscribe(
        data => {
          console.log("success!", data);
          this.user_details = data;
        },
        error => console.error("couldn't post because", error)
      );
  }
  ngOnInit() {
    this.authToken = this.getCookie('Authorization');
    if (this.authToken.length != 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.router.navigate(['/login']);

    }
    this.location_program_id = this.getCookie('program_id')
    console.log("location_program_id", this.location_program_id)
    if (this.authToken.length != 0) {
      debugger
      if (this.location_program_id.length != 0) {
        this.showStartups(this.location_program_id);
      }
    }
    this.getUserDetails();
    this.getAllProgram();
    // this.sharedDataService.currentMessage.subscribe(message => {
    //   this.message = message;
    // })
    // this.newMessage();
    this.loadAuth2()
  }
  getAllProgram() {
    this.apiCom.getDataWithoutAuth('get-list-of-programs')
      .subscribe(data => {
        //   this.allPrograms = data;
        this.livePrograms = data.all_programs.live;
        this.expPrograms = data.all_programs.exp;
        console.log(data);
        console.log(data.all_programs.live);
        console.log(data.all_programs.exp);
        this.setStatusForPrograms(data);
      }, error => {
        console.log(`The following error has been occured: ${error}`)

      })
  }
  setStatusForPrograms(programs) {
    this.allPrograms = [];
    for (let data of programs.all_programs.live) {
      console.log(data);
      data["status"] = "Running"
      this.allPrograms.push(data)
    }
    for (let data of programs.all_programs.exp) {
      console.log(data);
      data["status"] = "Expired"
      this.allPrograms.push(data)
    }
    console.log(this.allPrograms);
    let pr_id = this.getCookie('program_id')
    this.programselected = pr_id
    if (pr_id != (null && undefined && 0)) {
      this.showStartups(pr_id);
    }

  }
  showStartups(id: any) {
    debugger
    if (id != "" && id != (0 && null && undefined)) {
      let data = { "program_id": id };
      this.cookieService.set('program_id', id, 30, '/');
      let url = "program/get-session-by-program";
      this.apiCom.putDataWithToken(url, JSON.stringify(data), this.authToken)
        .subscribe(data => {
          debugger
          console.log(data);
          this.allStartups = data;
          this.unfilteredvalue = data
         // this.allStartups.sort((a, b) => { if (a.score < b.score) { return 1; } if (a.score > b.score) { return -1; } })
          console.log("this.allStartups" + this.allStartups)
          this.showStartup = true;
        }, error => {
          console.log(error);
        })
    }


  }
  getStartupRegQues(startup_id: number, program_id: number, startup: any) {
    debugger
    this.startup = startup;
    let url: string = "get-program-question-response";
    let data: {} = { startup_registration_id: startup_id, program_id: program_id };
    this.apiCom.postDataWithToken(url, JSON.stringify(data), this.authToken)
      .subscribe(data => {
        console.log(data);
        this.appRespQues = data
        debugger
      }, error => {
        console.log(data)
      })
  }
  submitAdminResponse(form: any) {
    debugger
  }
  
  filtervalues(value: string) {
    let item = value.toLowerCase()
    if (this.filterfeild != 'score') {
      this.allStartups = this.unfilteredvalue.filter((list) => list[this.filterfeild].toLowerCase().includes(item))
    } else if (value != "") {
      this.allStartups = this.unfilteredvalue.filter((list) => list.score == Number(value))
    } else {
      this.allStartups = this.unfilteredvalue
    }

  }
  resetprogram(){
    this.allStartups = this.unfilteredvalue
  }
  passValue(item){
    this.sharedDataService.changeMessage(item)
  }
  loadEvent(value,source){
    this.googleCalEvent.push(value)
    this.handleSignoutClick(gapi);
  }



 loadAuth2(): void {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: 'AIzaSyDcJ4jzw7KYwSfohcEEuTfWthAETT3vaOM',
            clientId: '132143603340-vugk5vh8tnisjo4omrttpva1lei4jq4a.apps.googleusercontent.com',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events'
        }).then((auth) => {

        },(error) =>{
            console.log(error);
        }
        );
    });
}

   updateSigninStatus(isSignedIn: boolean,session: any) {
    if (isSignedIn) {
    // this.calLoggedin = isSignedIn 
      this.listUpcomingEvents(session);
    } else {
    this.calLoggedin = isSignedIn
    }
  }
  
   handleAuthClick(session,type) {
    gapi.auth2.getAuthInstance().signIn()
    .then((auth) => {
        this.current_session = session;
        if (type === "create"){
          // this.updateSigninStatus(true,session);
          this.listUpcomingEvents(this.current_session)
        }
        else if (type === "delete"){
          this.listUpcomingEventsDelete(this.current_session)

        }else {
          this.listUpcomingEventsUpdate(this.current_session)
        }
    }, (error) =>{

    });
    this.calLoggedin = true;

  }
   handleSignoutClick(event) {
       debugger
    gapi.auth2.getAuthInstance().signOut();
    this.calLoggedin = false;

  }

  //  appendPre(message) {
  //   var pre = document.getElementById('content');
  //   var textContent = document.createTextNode(message + '\n');
  //   pre.appendChild(textContent);
  // }
   listUpcomingEvents(event: any) {
     debugger
     let session = {
      'summary': event.title,
      'location': event.where,
      'description': event.description,
      'start': {
        'dateTime': new Date(event.start_date_time).toISOString().replace('Z', ''),
        'timeZone': event.time_zone
      },
      'end': {
        'dateTime': new Date(event.end_date_time).toISOString().replace('Z', ''),
        'timeZone': event.time_zone
      },
      // 'recurrence': [
      //   'RRULE:FREQ=DAILY;COUNT=2'
      // ],
      'attendees': [
        // {'email': 'karthik.raj@ilerra.com'},
        // {'email': 'senthilaug1995@gmail.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      },
      "guestsCanSeeOtherGuests": false
      // 'id': event.id
    };
     let users = event.users;
     for (var i = 0; i<users.length;i++){
       session.attendees.push({'email': users[i].email})
     }
     debugger
 
       /////////here insert callender event
    gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': session,
      'sendNotifications': true
    }).then((auth) => {
      debugger
        this.zone.run(() => {
          debugger
          console.log(auth);
          this.curret_event_id = auth.result.id;
            this.updateInvited(this.curret_event_id,true);

        });
        debugger

    },(error)=> {
        console.log(error);
            alert("some thing happend");
    });
  }

  listUpcomingEventsUpdate(event: any) {
    debugger
    let session = {
     'summary': event.title,
     'location': event.where,
     'description': event.description,
     'start': {
       'dateTime': new Date(event.start_date_time).toISOString().replace('Z', ''),
       'timeZone': 'Asia/Calcutta'
     },
     'end': {
       'dateTime': new Date(event.end_date_time).toISOString().replace('Z', ''),
       'timeZone': 'Asia/Calcutta'
     },
    //  'recurrence': [
    //    'RRULE:FREQ=DAILY;COUNT=2'
    //  ],
     'attendees': [
       // {'email': 'karthik.raj@ilerra.com'},
       // {'email': 'senthilaug1995@gmail.com'}
     ],
     'reminders': {
       'useDefault': false,
       'overrides': [
         {'method': 'email', 'minutes': 24 * 60},
         {'method': 'popup', 'minutes': 10}
       ]
     },
     'id': event.event_id
     // 'id': event.id
   };
    let users = event.users;
    for (var i = 0; i<users.length;i++){
      session.attendees.push({'email': users[i].email})
    }
    debugger

      /////////here insert callender event
   gapi.client.calendar.events.patch({
     'calendarId': 'primary',
     'resource': session,
     'sendNotifications': true,
     'eventId': event.event_id
   }).then((auth) => {
     debugger
       this.zone.run(() => {
         debugger
         console.log(auth);
         this.curret_event_id = auth.result.id;
           this.updateInvited(this.curret_event_id,true);

       });
       debugger

   },(error)=> {
       console.log(error);
           alert("some thing happend");
   });
 }

 listUpcomingEventsDelete(event: any) {
  debugger

    /////////here insert callender event
 gapi.client.calendar.events.delete({
   'calendarId': 'primary',
  //  'resource': session,
   'sendNotifications': true,
   'eventId': event.event_id
 }).then((auth) => {
   debugger
     this.zone.run(() => {
       debugger
       console.log(auth);
       this.curret_event_id = auth.result.id;
         this.updateInvited(this.curret_event_id,false);
     });
     debugger

 },(error)=> {
     console.log(error);
         alert("some thing happend");
 });
}


  updateInvited(current_event_id: string,invited: boolean){
    let url = "/program/update-invite"
    let data = {session_id: this.current_session.id,event_id: current_event_id,invited: invited};
    this.apiCom.putDataWithToken(url,JSON.stringify(data),this.authToken)
    .subscribe(data=>{
      console.log(data);
      this.getAllProgram();
      gapi.auth2.getAuthInstance().signOut();
      this.calLoggedin = false;
      alert("Invitation successfully send");
    },
    error => {
      console.log(error);
      debugger
    })
  }
  
}
