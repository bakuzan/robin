import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, tap, filter } from 'rxjs/operators';

import { DashboardService } from 'src/app/common/dashboard.service';
import Dashboard, {
  IDashboardMonthCounts
} from 'src/app/common/models/dashboard.model';
import DateRangeFilter from 'src/app/common/models/date-range-filter.model';
import {
  getISOStringDate,
  getDaysAgo,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  isValidDate,
  pad
} from 'src/app/common/utils';
import {
  formatDateForDisplay,
  formatDateForInput
} from '../common/utils/calendar';
import {
  IDashboardChartEvent,
  IDashboardPieEvent
} from '../common/models/dashboard-chart-event.model';
import Aggregate from '../common/models/aggregate.model';
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
  private rightHandSideSpacing = 30;
  private pieSpacing = 15;
  @ViewChild('chartsRef', { static: false })
  chartsRef: ElementRef;
  isLoading = false;
  unboughtVolumes: Array<{
    displayName: string;
    link: string;
    dueDate: string;
    volumeAverage: string;
    isOut: boolean;
  }> = [];
  filters: DateRangeFilter = {
    fromDate: getISOStringDate(getDaysAgo(today, 365)),
    toDate: getISOStringDate(today)
  };

  private filterParams = new BehaviorSubject<DateRangeFilter>(this.filters);
  dashboard = new Dashboard();
  volumesOverTime: IDashboardMonthCounts[];
  expenditureOverTime: IDashboardMonthCounts[];
  whenRecordsBegan = whenRecordsBegan;

  // Line Chart options
  viewLineChart: any[] = [800, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Month';
  lineColourScheme = {
    domain: [this.comicColour, this.mangaColour]
  };

  // Pie Chart options
  viewPieChart: any[] = [400, 400];
  pieColourScheme = {
    domain: ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']
  };

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  get unboughtVolumesOutNow() {
    return this.unboughtVolumes.filter((x) => x.isOut);
  }

  ngOnInit() {
    this.filterParams
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
        this.volumesOverTime = dashboard.byMonthCounts.slice(0, 2);
        this.expenditureOverTime = dashboard.byMonthCounts.slice(2);
        this.updateChartViewSize();
      });

    this.dashboardService.getUnboughtVolumes().subscribe((volumes) => {
      const todayString = formatDateForInput(new Date());

      this.unboughtVolumes = volumes.map((x) => {
        const { series } = x;

        return {
          displayName: `${series.name} #${pad(`${x.number}`, 2)}`,
          dueDate: x.releaseDate
            ? formatDateForDisplay(x.releaseDate)
            : 'Unknown release date',
          volumeAverage: series.volumeAverage
            ? `£ ${series.volumeAverage} (avg)`
            : `No average data`,
          link: `/series/view/${series.id}`,
          isOut: x.releaseDate <= todayString
        };
      });
    });
  }

  getDashboard() {
    const params = this.filters;
    this.filterParams.next(params);
  }

  onUserInput() {
    this.getDashboard();
  }

  onChartClick(point: IDashboardChartEvent) {
    const targetUrl = Urls.purchaseHistory;

    const fullDate = `${point.name}-01`;
    const fromDate = getISOStringDate(getFirstDateOfMonth(fullDate));
    const toDate = getISOStringDate(getLastDateOfMonth(fullDate));

    const navigationExtras: NavigationExtras = {
      queryParams: { type: point.series, fromDate, toDate }
    };

    this.router.navigate([targetUrl], navigationExtras);
  }

  onPieClick(slice: IDashboardPieEvent) {
    console.log(
      '%c Pie Slice Click not yet implemented',
      'color: firebrick',
      slice
    );
  }

  aggregateTitleStyle(agg: Aggregate) {
    return {
      color: agg.label === 'Comic' ? this.comicColour : this.mangaColour
    };
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }

  private updateChartViewSize() {
    const containerWidth =
      (this.chartsRef && this.chartsRef.nativeElement.offsetWidth) || 0;

    const isColumnLayout = containerWidth > 768;
    const widthWithoutMargin = isColumnLayout
      ? containerWidth * 0.96
      : containerWidth;
    const pieBaseWidth = isColumnLayout
      ? Math.floor(widthWithoutMargin / 2)
      : widthWithoutMargin;

    const lineChartWidth = widthWithoutMargin - this.rightHandSideSpacing;
    const pieChartWidth = pieBaseWidth - this.pieSpacing;

    this.viewLineChart = [lineChartWidth, 400];
    this.viewPieChart = [pieChartWidth, 400];
  }

  private datesAreValid(params: DateRangeFilter): boolean {
    const f = isValidDate(params.fromDate);
    const t = isValidDate(params.toDate);
    return f && t;
  }
}
