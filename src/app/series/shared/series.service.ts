import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Series from './series.model';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor() {}

  getSeries(id: string): Observable<Series> {
    return null;
  }
}
