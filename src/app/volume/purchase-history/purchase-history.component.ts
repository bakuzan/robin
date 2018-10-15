import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { VolumeService } from '../../common/volume.service';
import VolumeFilter from '../shared/volume-filter.model';
import Volume from 'src/app/common/models/volume.model';
import SeriesType from 'src/app/common/models/series-types.enum';

const today = new Date().toISOString();

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  private filterParams = new BehaviorSubject<VolumeFilter>({
    type: SeriesType.Manga,
    fromDate: today,
    toDate: today
  });
  volumes$: Observable<Volume[]>;

  constructor(private volumeService: VolumeService) {}

  ngOnInit() {
    this.volumes$ = this.filterParams.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((params: VolumeFilter) => this.volumeService.getVolumes(params))
    );
  }

  search(params: VolumeFilter): void {
    console.log('search!', params, this.volumes$);
    this.filterParams.next(params);
  }
}
