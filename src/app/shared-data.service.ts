import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private messageSource = new BehaviorSubject<any>('default mesaage');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(message: any){
    this.messageSource.next(message);
  }
}
