import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  switchMap,
  tap,
  filter,
  distinctUntilChanged
} from 'rxjs/operators';

import { DashboardService } from 'src/app/common/dashboard.service';
import Dashboard from 'src/app/common/models/dashboard.model';
import DateRangeFilter from 'src/app/common/models/date-range-filter.model';
import {
  getISOStringDate,
  getDaysAgo,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  isValidDate
} from 'src/app/common/utils';
import DashboardChartEvent from '../common/models/dashboard-chart-event.model';
import Urls from '../common/constants/urls';
import whenRecordsBegan from '../common/constants/when-records-began';

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
  private dashboard$ = null;
  @ViewChild('chartsRef')
  chartsRef: ElementRef;
  isLoading = false;
  filters: DateRangeFilter = {
    fromDate: getISOStringDate(getDaysAgo(today, 365)),
    toDate: getISOStringDate(today)
  };
  private filterParams = new BehaviorSubject<DateRangeFilter>(this.filters);
  dashboard = new Dashboard();
  view: any[] = [800, 400];
  whenRecordsBegan = whenRecordsBegan;

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
    this.dashboard$ = this.filterParams
      .pipe(
        debounceTime(500),
        filter(
          (params: DateRangeFilter) =>
            params.fromDate && params.toDate && this.datesAreValid(params)
        ),
        tap(() => (this.isLoading = true)),
        switchMap((params: DateRangeFilter) =>
          this.dashboardService.getDashboard(params)
        )
      )
      .subscribe((dashboard) => {
        this.isLoading = false;
        this.dashboard = dashboard;
      });

    this.updateChartViewSize();
  }

  getDashboard() {
    const params = this.filters;
    this.filterParams.next(params);
  }

  onUserInput() {
    this.getDashboard();
  }

  onChartClick(point: DashboardChartEvent) {
    const targetUrl = Urls.purchaseHistory;

    const fullDate = `${point.name}-01`;
    const fromDate = getISOStringDate(getFirstDateOfMonth(fullDate));
    const toDate = getISOStringDate(getLastDateOfMonth(fullDate));

    const navigationExtras: NavigationExtras = {
      queryParams: { type: point.series, fromDate, toDate }
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

  datesAreValid(params: DateRangeFilter): boolean {
    const f = isValidDate(params.fromDate);
    const t = isValidDate(params.toDate);
    return f && t;
  }
}
