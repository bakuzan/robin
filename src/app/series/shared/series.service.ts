import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import { createApolloServerPayload } from 'src/app/common/utils/query-builder';
import Series from '../../common/models/series.model';
import SeriesFilter from './series-filter.model';
import SeriesGQL from 'src/app/common/queries';
import { AlertService } from 'src/app/common/alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private seriesUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getSeries(filters: SeriesFilter): Observable<Series[]> {
    const payload = createApolloServerPayload(SeriesGQL.Query.getSeries, {
      filters
    });

    return this.http.post<Series[]>(this.seriesUrl, payload, httpOptions).pipe(
      map((response: any) => this.mapToResponse<Series[]>('series', response)),
      catchError(this.handleError<Series[]>('searchSeries', []))
    );
  }

  getSeriesById(id: number): Observable<Series> {
    const payload = createApolloServerPayload(SeriesGQL.Query.getSeriesById, {
      id
    });
    return this.http.post<Series>(this.seriesUrl, payload, httpOptions).pipe(
      map((response: any) =>
        this.mapToResponse<Series>('seriesById', response)
      ),
      catchError(this.handleError<Series>(`getSeries id=${id}`))
    );
  }

  addSeries(series: Series): Observable<Series> {
    const payload = createApolloServerPayload(SeriesGQL.Mutation.createSeries, {
      series
    });
    return this.http.post<Series>(this.seriesUrl, payload, httpOptions).pipe(
      map((response: any) =>
        this.mapToResponse<Series>('seriesCreate', response)
      ),
      catchError(this.handleError<Series>('addSeries'))
    );
  }

  updateSeries(series: Series): Observable<Series> {
    const payload = createApolloServerPayload(SeriesGQL.Mutation.updateSeries, {
      series
    });
    return this.http.post(this.seriesUrl, payload, httpOptions).pipe(
      map((response: any) =>
        this.mapToResponse<Series>('seriesUpdate', response)
      ),
      catchError(this.handleError<any>('updateSeries'))
    );
  }

  deleteSeries(series: Series | number): Observable<Series> {
    const id = typeof series === 'number' ? series : series.id;
    const url = `${this.seriesUrl}/${id}`;

    return this.http
      .delete<Series>(url, httpOptions)
      .pipe(catchError(this.handleError<Series>('deleteSeries')));
  }

  private mapToResponse<T>(attr: string, response: any, ofType?: T): T {
    const result = response.data && (response.data[attr] as T);
    if (!result) {
      throw Error(`${attr} data not found`);
    }

    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('%c Series api Error', 'color: firebrick', error);
      this.alertService.sendError({
        message: `${operation} failed`,
        detail: error.message
      });

      return of(result as T);
    };
  }
}
