import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import Series from './series.model';
import SeriesFilter from './series-filter.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private seriesUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient) {}

  getSeries(filter: SeriesFilter): Observable<Series[]> {
    return this.http.post<Series[]>(this.seriesUrl, filter, httpOptions).pipe(
      tap((_) => console.log(`found series matching`, filter)),
      catchError(this.handleError<Series[]>('searchSeries', []))
    );
  }

  getSeriesById(id: number): Observable<Series> {
    const url = `${this.seriesUrl}/${id}`;
    return this.http.get<Series>(url).pipe(
      tap((_) => this.log(`fetched series id=${id}`)),
      catchError(this.handleError<Series>(`getSeries id=${id}`))
    );
  }

  addSeries(series: Series): Observable<Series> {
    return this.http.post<Series>(this.seriesUrl, series, httpOptions).pipe(
      tap((s: Series) => this.log(`added hero w/ id=${s.id}`)),
      catchError(this.handleError<Series>('addSeries'))
    );
  }

  updateSeries(series: Series): Observable<any> {
    return this.http.put(this.seriesUrl, series, httpOptions).pipe(
      tap((_) => this.log(`updated series id=${series.id}`)),
      catchError(this.handleError<any>('updateSeries'))
    );
  }

  deleteSeries(series: Series | number): Observable<Series> {
    const id = typeof series === 'number' ? series : series.id;
    const url = `${this.seriesUrl}/${id}`;

    return this.http.delete<Series>(url, httpOptions).pipe(
      tap((_) => this.log(`deleted series id=${id}`)),
      catchError(this.handleError<Series>('deleteSeries'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    // TODO:
    // transforming error to be user friendly
  }
}