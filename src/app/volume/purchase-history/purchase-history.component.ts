import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';

import { VolumeService } from '../../common/volume.service';
import VolumeFilter from '../shared/volume-filter.model';
import Volume from 'src/app/common/models/volume.model';
import SeriesType from 'src/app/common/models/series-types.enum';
import {
  pad,
  displayAs2dp,
  getDaysAgo,
  getISOStringDate
} from 'src/app/common/utils';

const today = new Date();

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  private filterParams = new BehaviorSubject<VolumeFilter>({
    type: SeriesType.Manga,
    fromDate: getISOStringDate(getDaysAgo(today, 30)),
    toDate: getISOStringDate(today)
  });
  volumes$: Observable<Volume[]>;
  itemCount: number;

  constructor(private volumeService: VolumeService) {}

  ngOnInit() {
    this.volumes$ = this.filterParams.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((params) => !!(params.fromDate && params.toDate)), // TODO validate dates
      switchMap((params: VolumeFilter) => this.volumeService.getVolumes(params))
    );

    this.volumes$.subscribe((items) => (this.itemCount = items.length));
  }

  search(params: VolumeFilter): void {
    console.log('search!', params, this.volumes$);
    this.filterParams.next(params);
  }

  padNumber(num): string {
    return pad(`${num}`, 3);
  }

  rounded(num): string {
    return displayAs2dp(num);
  }
}
