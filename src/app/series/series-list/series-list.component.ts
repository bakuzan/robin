import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SeriesService } from '../shared/services/series.service';
import Series from '../shared/series.model';
import SeriesFilter from '../shared/series-filter.model';
import { SeriesTypes } from '../shared/series-types.enum';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  private filterParams = new BehaviorSubject<SeriesFilter>({
    search: '',
    types: Array.from(SeriesTypes)
  });
  series$: Observable<Series[]>;

  constructor(private service: SeriesService) {}

  ngOnInit() {
    this.series$ = this.filterParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((params: SeriesFilter) => this.service.getSeries(params))
    );
  }

  search(params: SeriesFilter): void {
    console.log('search!', params, this.series$);
    this.filterParams.next(params);
  }
}
