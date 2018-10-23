import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import { createApolloServerPayload } from 'src/app/common/utils/query-builder';
import DashboardGQL from './queries';
import Dashboard from 'src/app/common/models/dashboard.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<Dashboard> {
    const payload = createApolloServerPayload(
      DashboardGQL.Query.getDashboard,
      {}
    );

    return this.http.post(this.dashboardUrl, payload, httpOptions).pipe(
      tap(() => this.log(`get dashboard`)),
      catchError(this.handleError<Dashboard>('dashboard')),
      map(
        (response: any) =>
          response.data && (response.data.dashboard as Dashboard)
      )
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
