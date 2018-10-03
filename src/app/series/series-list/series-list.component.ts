import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SeriesService } from '../shared/series.service';
import Series from '../shared/series.model';
import SeriesFilter from '../shared/series-filter.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  private filterParams = new Subject<SeriesFilter>();
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
    console.log('search!', params);
    this.filterParams.next(params);
  }
}
