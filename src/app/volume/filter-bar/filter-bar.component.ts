import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import VolumeFilter from '../shared/volume-filter.model';
import SeriesType, { SeriesTypes } from '../../common/models/series-types.enum';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import { getDaysAgo, getISOStringDate } from 'src/app/common/utils';

const today = new Date();

@Component({
  selector: 'app-volume-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  filters: VolumeFilter = {
    type: SeriesType.Manga,
    fromDate: getISOStringDate(getDaysAgo(today, 30)),
    toDate: getISOStringDate(today)
  };
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onInput() {
    this.update.emit({ ...this.filters });
  }
}
