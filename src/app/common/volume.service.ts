/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Urls } from 'src/app/common/constants';
import { createApolloServerPayload } from 'src/app/common/utils/query-builder';
import Volume from './models/volume.model';
import VolumeGQL from './queries';
import VolumeFilter from '../volume/shared/volume-filter.model';
import ImportResponse from './models/import-response.model';
import ExportResponse from './models/export-response.model';
import ImportRow from './models/import-row.model';
import SeriesType from './models/series-types.enum';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VolumeService {
  private volumeUrl = Urls.graphqlEndpoint;

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getVolumes(filters: VolumeFilter): Observable<Volume[]> {
    const payload = createApolloServerPayload(
      VolumeGQL.Query.getVolumesForFilters,
      {
        filters
      }
    );

    return this.http
      .post<VolumeFilter>(this.volumeUrl, payload, httpOptions)
      .pipe(
        catchError(this.handleError<Volume[]>('volumes')),
        map((response: any) => {
          if (response.data && response.data.volumes) {
            return response.data.volumes as Volume[];
          }

          const error = response.errors[0] || { message: 'Server error' };
          this.alertService.sendError({
            message: `Volumes Query failed`,
            detail: error.message
          });
          return [] as Volume[];
        })
      );
  }

  addVolume(volume: Volume): Observable<Volume> {
    const payload = createApolloServerPayload(VolumeGQL.Mutation.createVolume, {
      volume
    });
    return this.http.post<Volume>(this.volumeUrl, payload, httpOptions).pipe(
      catchError(this.handleError<Volume>('addVolume')),
      map(
        (response: any) =>
          response.data && (response.data.volumeCreate as Volume)
      )
    );
  }

  updateVolume(volume: Volume): Observable<Volume> {
    const payload = createApolloServerPayload(VolumeGQL.Mutation.updateVolume, {
      volume
    });
    return this.http.post(this.volumeUrl, payload, httpOptions).pipe(
      catchError(this.handleError<any>('updateVolume')),
      map(
        (response: any) =>
          response.data && (response.data.volumeUpdate as Volume)
      )
    );
  }

  deleteVolume(volume: Volume | number): Observable<Volume> {
    const id = typeof volume === 'number' ? volume : volume.id;
    const url = `${this.volumeUrl}/${id}`;

    return this.http
      .delete<Volume>(url, httpOptions)
      .pipe(catchError(this.handleError<Volume>('deleteVolume')));
  }

  importVolumes(
    volumes: ImportRow[],
    importType: SeriesType
  ): Observable<ImportResponse> {
    const payload = createApolloServerPayload(
      VolumeGQL.Mutation.importVolumes,
      {
        volumes,
        importType
      }
    );

    return this.http.post(this.volumeUrl, payload, httpOptions).pipe(
      catchError(this.handleError<any>('import')),
      map(
        (response: any) =>
          (response.data && response.data.import
            ? response.data.import
            : {
                success: false,
                messages: response.errors.map((x) => x.message)
              }) as ImportResponse
      )
    );
  }

  exportVolumes(filters: VolumeFilter): Observable<ExportResponse> {
    const payload = createApolloServerPayload(VolumeGQL.Query.exportVolumes, {
      filters
    });

    return this.http.post(this.volumeUrl, payload, httpOptions).pipe(
      catchError(this.handleError<any>('export')),
      map(
        (response: any) =>
          (response.data && response.data.export
            ? response.data.export
            : {
                success: false,
                messages: response.errors.map((x) => x.message),
                data: null
              }) as ExportResponse
      )
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
