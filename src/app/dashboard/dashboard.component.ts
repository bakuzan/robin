import { Component, OnInit } from '@angular/core';

import { DashboardService } from 'src/app/common/dashboard.service';
import Dashboard from 'src/app/common/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboard = new Dashboard();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService
      .getDashboard()
      .subscribe((dash) => (this.dashboard = dash));
  }
}
