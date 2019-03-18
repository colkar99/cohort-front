import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }
  like( num_likes ) {
    // this.http.post('http://localhost:3120/update', {'likes': num_likes})
    // .subscribe(data => {});
    let s_data = {like: num_likes}
    this.http.post('http://ec2-54-172-0-213.compute-1.amazonaws.com/v1/update',{s_data})
    .subscribe(data => {console.log(data)});
  }

}
