import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import { createApolloServerPayload } from 'src/app/common/utils/query-builder';
import Volume from './models/volume.model';
import RetailerGQL from './queries';
import Retailer from './models/retailer.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  private retailerUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient) {}

  getRetailers(): Observable<Retailer[]> {
    const payload = createApolloServerPayload(
      RetailerGQL.Query.getRetailers,
      {}
    );

    return this.http.post(this.retailerUrl, payload, httpOptions).pipe(
      tap((s: Retailer[]) => this.log(`get retailers`)),
      catchError(this.handleError<Volume[]>('retailers')),
      map(
        (response: any) =>
          response.data && (response.data.retailers as Retailer[])
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
