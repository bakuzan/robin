import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';

import { DashboardService } from 'src/app/common/dashboard.service';
import Dashboard from 'src/app/common/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartsRef')
  chartsRef: ElementRef;
  dashboard = new Dashboard();
  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Month';
  yAxisLabel = 'Count';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboard();
    this.updateChartViewSize();
  }

  getDashboard() {
    this.dashboardService
      .getDashboard()
      .subscribe((dash) => (this.dashboard = dash));
  }

  updateChartViewSize() {
    const width = Math.floor(this.chartsRef.nativeElement.offsetWidth / 2);
    this.view = [width, 400];
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }
}
