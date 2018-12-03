import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  tap
} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import SeriesType from 'src/app/common/models/series-types.enum';
import { VolumeService } from '../../common/volume.service';
import VolumeFilter from '../shared/volume-filter.model';
import Volume from 'src/app/common/models/volume.model';
import {
  isValidDate,
  getISOStringDate,
  getDaysAgo,
  getFirstDateOfMonth,
  getLastDateOfMonth
} from 'src/app/common/utils';
import Urls from 'src/app/common/constants/urls';

const today = new Date();
const combinedFilterString = (x: VolumeFilter) =>
  `${x.type}${x.fromDate}${x.toDate}`;

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  startingParams: VolumeFilter = {
    type: SeriesType.Manga,
    fromDate: getISOStringDate(getDaysAgo(today, 30)),
    toDate: getISOStringDate(today)
  };
  private filterParams = new BehaviorSubject<VolumeFilter>(this.startingParams);
  isLoading = false;
  volumes$: Observable<Volume[]>;
  itemCount: number;

  constructor(
    private volumeService: VolumeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        const { type, month } = params;
        if (type) {
          this.startingParams.type = type;
        }

        if (month) {
          const fullDate = `${month}-01`;
          if (isValidDate(fullDate)) {
            this.startingParams.fromDate = getISOStringDate(
              getFirstDateOfMonth(fullDate)
            );
            this.startingParams.toDate = getISOStringDate(
              getLastDateOfMonth(fullDate)
            );
          }
        }
      })
      .unsubscribe();

    this.volumes$ = this.filterParams.pipe(
      debounceTime(500),
      distinctUntilChanged(
        (x: VolumeFilter, y: VolumeFilter) =>
          combinedFilterString(x) === combinedFilterString(y)
      ),
      filter(
        (params: VolumeFilter) =>
          params.fromDate && params.toDate && this.datesAreValid(params)
      ),
      tap(() => (this.isLoading = true)),
      switchMap((params: VolumeFilter) =>
        this.volumeService.getVolumes(params)
      ),
      tap((items: Volume[]) => {
        this.itemCount = items.length;
        this.isLoading = false;
      })
    );
  }

  search(params: VolumeFilter): void {
    this.filterParams.next(params);
    this.removeQueryParamsIfExist();
  }

  datesAreValid(params: VolumeFilter): boolean {
    return isValidDate(params.fromDate) && isValidDate(params.toDate);
  }

  removeQueryParamsIfExist() {
    const hasQueryParams = this.router.url.includes('?');

    if (hasQueryParams) {
      const currentBaseUrl = Urls.purchaseHistory;
      this.router.navigate([currentBaseUrl], {
        queryParams: {}
      });
    }
  }
}
