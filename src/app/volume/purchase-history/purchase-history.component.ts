import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  tap
} from 'rxjs/operators';

import SeriesType from 'src/app/common/models/series-types.enum';
import { VolumeService } from '../../common/volume.service';
import VolumeFilter from '../shared/volume-filter.model';
import Volume from 'src/app/common/models/volume.model';
import {
  isValidDate,
  getISOStringDate,
  getDaysAgo
} from 'src/app/common/utils';

const today = new Date();
const combinedFilterString = (x: VolumeFilter) =>
  `${x.type}${x.fromDate}${x.toDate}`;

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
        (x: VolumeFilter, y: VolumeFilter) =>
          combinedFilterString(x) === combinedFilterString(y)
      ),
      filter(
        (params: VolumeFilter) =>
          params.fromDate && params.toDate && this.datesAreValid(params)
      ),
      switchMap((params: VolumeFilter) =>
        this.volumeService.getVolumes(params)
      ),
      tap((items: Volume[]) => (this.itemCount = items.length))
    );
  }

  search(params: VolumeFilter): void {
    this.filterParams.next(params);
  }

  datesAreValid(params: VolumeFilter): boolean {
    return isValidDate(params.fromDate) && isValidDate(params.toDate);
  }
}
