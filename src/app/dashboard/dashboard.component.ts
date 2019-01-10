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
  private comicColour = '#339933';
  private mangaColour = '#3366cc';
  private rightHandSideSpacing = 25;
  @ViewChild('chartsRef')
  chartsRef: ElementRef;
  isLoading = false;
  filters: DashboardFilters = {
    fromDate: getISOStringDate(getDaysAgo(today, 365)),
    toDate: getISOStringDate(today)
  };
  dashboard = new Dashboard();
  view: any[] = [800, 400];

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
    domain: [this.comicColour, this.mangaColour]
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

  updateChartViewSize() {
    const width =
      this.chartsRef.nativeElement.offsetWidth - this.rightHandSideSpacing;
    this.view = [width, 400];
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }
}
