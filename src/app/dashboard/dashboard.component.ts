import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { DashboardService } from 'src/app/common/dashboard.service';
import Dashboard from 'src/app/common/models/dashboard.model';
import DashboardFilters from 'src/app/common/models/dashboard-filter.model';
import { getISOStringDate, getDaysAgo } from 'src/app/common/utils';
import DashboardChartEvent from '../common/models/dashboard-chart-event.model';
import Urls from '../common/constants/urls';

const today = new Date();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chartsRef')
  chartsRef: ElementRef;
  isLoading = false;
  filters: DashboardFilters = {
    fromDate: getISOStringDate(getDaysAgo(today, 365)),
    toDate: getISOStringDate(today)
  };
  dashboard = new Dashboard();
  view: any[] = [500, 400];

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

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDashboard();
    this.updateChartViewSize();
  }

  getDashboard() {
    this.isLoading = true;
    this.dashboardService.getDashboard(this.filters).subscribe((data) => {
      this.dashboard = data;
      this.isLoading = false;
    });
  }

  updateChartViewSize() {
    const width = Math.floor(this.chartsRef.nativeElement.offsetWidth / 2);
    this.view = [width, 400];
  }

  onUserInput() {
    this.getDashboard();
  }

  onChartClick(point: DashboardChartEvent) {
    const targetUrl = Urls.purchaseHistory;
    const navigationExtras: NavigationExtras = {
      queryParams: { type: point.series, month: point.name }
    };

    this.router.navigate([targetUrl], navigationExtras);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }
}
