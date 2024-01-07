import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BehaviourService {
  userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  updateEvent(event: any) {
    this.userDataSubject.next(event);
  }
}
