import { Component, OnInit,ViewChild,NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedDataService } from './../../shared-data.service';
import { ApiCommunicationService } from './../../api-communication.service'
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
declare var $: any
declare var gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './program-sessions.component.html',
  styleUrls: ['./program-sessions.component.css']
})
export class ProgramSessionComponent implements OnInit  {
    // authorizeButton: HTMLElement;
    // signoutButton: HTMLElement;
    googleCalEvent: Array<any>;
    calLoggedin: boolean;
    events: Array<any>;
    loadEventData = [];
    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private cookieService: CookieService,
    private router: Router,
    private sharedData: SharedDataService,
    private apiCom:ApiCommunicationService,
    private zone: NgZone
  ) {
    // this.detect.detectChanges();
    this.calLoggedin = true;



  }


  getCookie(key: string) {
    return this.cookieService.get(key);
  }
  deleteCookie(key: string) {
    return this.cookieService.deleteAll('/');
  }

  loadEventFromBackEnd(){
      let url ='chart/get-event';
      this.apiCom.getDataWithoutAuth(url)
      .subscribe(data =>{
        
        for (let i = 0; i<data.length;i++){
            this.googleCalEvent.push(data[i]);
        }
        console.log(this.events);

      },error =>{
          console.log(error);
      })
  }

  clickLoadEvent(vale){
        let el = {
            title: vale.title,
            start: vale.start
          }
          this.ucCalendar.fullCalendar('renderEvent', el);
          this.ucCalendar.fullCalendar('rerenderEvents');
 
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
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then((auth) => {

        },(error) =>{
            console.log(error);
        }
        );
    });
}

   updateSigninStatus(isSignedIn: boolean) {
    debugger
    if (isSignedIn) {
        debugger
    // this.calLoggedin = isSignedIn 
      this.listUpcomingEvents();
    } else {
    this.calLoggedin = isSignedIn
    }
  }
  
   handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn()
    .then((auth) => {
        debugger
        this.updateSigninStatus(true);
    }, (error) =>{

    });
    this.calLoggedin = true;

  }
   handleSignoutClick(event) {
       debugger
    gapi.auth2.getAuthInstance().signOut();
    this.calLoggedin = false;

  }

   appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
   listUpcomingEvents() {
       debugger
    gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((auth) => {
        this.zone.run(() => {
            var events = auth.result.items;
            this.appendPre('Upcoming events:');
            debugger
            if (events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                let data = {title: event.summary ,start: event.start.dateTime }
                this.loadEvent(data,'google');
                if (!when) {
                    when = event.start.date;
                }
                this.appendPre(event.summary + ' (' + when + ')')
                }
            } else {
                this.appendPre('No upcoming events found.');
            }
        });
        debugger

    },(error)=> {
        console.log(error);
    });
  }
  
 

 ngOnInit() {
    this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: []
      };

    //   this.handleClientLoad();
    this.googleCalEvent = []
    this.loadAuth2()
  }



}
