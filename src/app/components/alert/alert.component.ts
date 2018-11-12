import classNames from 'classnames';
import { Component, OnInit } from '@angular/core';

import Alert, { AlertType } from 'src/app/common/models/alert.model';
import { Icons } from 'src/app/common/constants';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  closeIcon = Icons.cross;

  constructor(private service: AlertService) {}

  ngOnInit() {
    this.service.subscribe((newAlert: Alert) => this.alerts.push(newAlert));
  }

  get activeAlert(): Alert {
    return this.hasAlert ? this.alerts[0] : null;
  }

  get expandIcon(): string {
    return this.activeAlert && this.activeAlert.showDetail
      ? Icons.up
      : Icons.down;
  }

  get hasAlert(): boolean {
    return !!this.alerts.length;
  }

  get alertType(): AlertType {
    return this.activeAlert.type || AlertType.INFO;
  }

  get alertClasses(): string {
    return classNames('alert', {
      'alert--is-expanded': this.activeAlert && this.activeAlert.showDetail
    });
  }

  get messageClasses(): string {
    return classNames('alert__message', [
      `alert__message--type_${this.alertType}`
    ]);
  }

  get iconClasses(): string {
    return classNames('alert__icon', [`alert__icon--type_${this.alertType}`]);
  }

  showDetail(alertId) {
    this.alerts = this.alerts.map(
      (x) => (x.id !== alertId ? x : { ...x, showDetail: !x.showDetail })
    );
  }

  remove(alertId) {
    this.alerts = this.alerts.filter((x) => x.id !== alertId);
  }
}
