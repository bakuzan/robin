import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import SeriesFilter from '../shared/series-filter.model';
import { SeriesTypes } from '../../common/models/series-types.enum';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import { SeriesStatuses } from 'src/app/common/models/series-statuses.enum';

@Component({
  selector: 'app-series-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  addUrl = 'create';
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  seriesStatusOptions = mapEnumToSelectOption(SeriesStatuses);
  values: SeriesFilter;
  @Input()
  filters: SeriesFilter;
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.values = { ...this.filters };
  }

  onInput() {
    this.update.emit({ ...this.values });
  }
}
