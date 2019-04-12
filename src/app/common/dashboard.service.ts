import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import { createApolloServerPayload } from 'src/app/common/utils/query-builder';
import DashboardGQL from './queries';
import Dashboard from 'src/app/common/models/dashboard.model';
import DateRangeFilter from './models/date-range-filter.model';
import { AlertService } from './alert.service';
import Volume from './models/volume.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getDashboard(filters: DateRangeFilter): Observable<Dashboard> {
    const payload = createApolloServerPayload(DashboardGQL.Query.getDashboard, {
      filters
    });

    return this.http.post(this.dashboardUrl, payload, httpOptions).pipe(
      catchError(this.handleError<Dashboard>('dashboard')),
      map((response: any) => {
        if (response.data && response.data.dashboard) {
          return response.data.dashboard as Dashboard;
        }

        const error = response.errors[0] || { message: 'Server error' };
        this.alertService.sendError({
          message: `Dashboard Query failed`,
          detail: error.message
        });
        return {} as Dashboard;
      })
    );
  }

  getUnboughtVolumes(): Observable<Array<Volume>> {
    const payload = createApolloServerPayload(
      DashboardGQL.Query.getUnboughtVolumes,
      {}
    );

    return this.http.post(this.dashboardUrl, payload, httpOptions).pipe(
      catchError(this.handleError<Array<Volume>>('unboughtVolumes')),
      map((response: any) => {
        if (response.data && response.data.unboughtVolumes) {
          return response.data.unboughtVolumes as Array<Volume>;
        }

        const error = response.errors[0] || { message: 'Server error' };
        this.alertService.sendError({
          message: `Unbought Volumes Query failed`,
          detail: error.message
        });
        return [] as Array<Volume>;
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.alertService.sendError({
        message: `${operation} failed`,
        detail: error.message
      });

      return of(result as T);
    };
  }
}
