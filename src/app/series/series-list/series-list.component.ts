import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';

import { SeriesService } from '../shared/series.service';
import Series from '../../common/models/series.model';
import SeriesFilter from '../shared/series-filter.model';
import SeriesType from 'src/app/common/models/series-types.enum';
import SeriesStatus, {
  SeriesStatuses
} from 'src/app/common/models/series-statuses.enum';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  startingParams: SeriesFilter = {
    search: '',
    type: SeriesType.Manga,
    statuses: [SeriesStatus.Ongoing]
  };
  private filterParams = new BehaviorSubject<SeriesFilter>(this.startingParams);
  series$: Observable<Series[]>;
  itemCount: number;

  constructor(private service: SeriesService) {}

  ngOnInit() {
    this.series$ = this.filterParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((params: SeriesFilter) => this.service.getSeries(params)),
      tap((items: Series[]) => (this.itemCount = items.length))
    );
  }

  search(params: SeriesFilter): void {
    this.filterParams.next(params);
  }
}
