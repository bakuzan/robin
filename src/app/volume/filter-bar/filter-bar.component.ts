import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import VolumeFilter from '../shared/volume-filter.model';
import SeriesType, { SeriesTypes } from '../../common/models/series-types.enum';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

const today = new Date().toISOString();

@Component({
  selector: 'volume-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  filters: VolumeFilter = {
    type: SeriesType.Manga,
    fromDate: today,
    toDate: today
  };
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onInput() {
    console.log('update!', this.filters);
    this.update.emit({ ...this.filters });
  }
}
