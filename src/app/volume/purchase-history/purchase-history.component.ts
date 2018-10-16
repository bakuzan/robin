import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';

import SeriesType from 'src/app/common/models/series-types.enum';
import { VolumeService } from '../../common/volume.service';
import VolumeFilter from '../shared/volume-filter.model';
import Volume from 'src/app/common/models/volume.model';
import {
  pad,
  displayAs2dp,
  isValidDate,
  getISOStringDate,
  getDaysAgo
} from 'src/app/common/utils';

const today = new Date();

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  private startingParams: VolumeFilter = {
    type: SeriesType.Manga,
    fromDate: getISOStringDate(getDaysAgo(today, 30)),
    toDate: getISOStringDate(today)
  };
  private filterParams = new BehaviorSubject<VolumeFilter>(this.startingParams);
  volumes$: Observable<Volume[]>;
  itemCount: number;

  constructor(private volumeService: VolumeService) {}

  ngOnInit() {
    this.volumes$ = this.filterParams.pipe(
      debounceTime(500),
      distinctUntilChanged(
        (x, y) =>
          `${x.type}${x.fromDate}${x.toDate}` ===
          `${y.type}${y.fromDate}${y.toDate}`
      ),
      filter(
        (params) =>
          params.fromDate && params.toDate && this.datesAreValid(params)
      ),
      switchMap((params: VolumeFilter) => this.volumeService.getVolumes(params))
    );

    this.volumes$.subscribe((items) => {
      console.log(items);
      this.itemCount = items.length;
    });
  }

  search(params: VolumeFilter): void {
    console.log('search!', params, this.volumes$);
    this.filterParams.next(params);
  }

  datesAreValid(params: VolumeFilter): boolean {
    return isValidDate(params.fromDate) && isValidDate(params.toDate);
  }

  padNumber(num): string {
    return pad(`${num}`, 3);
  }

  rounded(num): string {
    return displayAs2dp(num);
  }
}
