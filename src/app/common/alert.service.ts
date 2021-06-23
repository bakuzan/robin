import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { generateUniqueId } from 'src/app/common/utils';
import Alert, { AlertType, AlertData } from './models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert$ = new Subject<Alert>();

  constructor() {}

  subscribe(fn) {
    this.alert$.subscribe(fn);
  }

  send(obj: AlertData, type = AlertType.INFO) {
    this.pushAlert({
      id: generateUniqueId(),
      type,
      message: '',
      detail: '',
      ...obj
    } as Alert);
  }

  sendInfo(obj: AlertData) {
    this.send(obj);
  }
  sendWarning(obj: AlertData) {
    this.send(obj, AlertType.WARNING);
  }
  sendSuccess(obj: AlertData) {
    this.send(obj, AlertType.SUCCESS);
  }
  sendError(obj: AlertData) {
    this.send(obj, AlertType.ERROR);
    console.log('%c Alert Service Error Sent >', 'color: brickred', obj);
  }

  private pushAlert(alert: Alert) {
    this.alert$.next(alert);
  }
}
