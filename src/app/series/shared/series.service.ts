import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Series from './series.model';
import SeriesFilter from './series-filter.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor() {}

  getSeries(filter: SeriesFilter): Observable<Series[]> {
    console.log('%c getSeries', 'color: forestgreen', filter);
    return null;
  }

  getSeriesById(id: string): Observable<Series> {
    console.log('%c getSeriesById', 'color: royalblue', id);
    return null;
  }
}
