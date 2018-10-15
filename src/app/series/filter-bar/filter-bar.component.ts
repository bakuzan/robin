import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import SeriesFilter from '../shared/series-filter.model';
import { SeriesTypes } from '../../common/models/series-types.enum';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  addUrl = 'create';
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  filters: SeriesFilter = {
    search: '',
    types: Array.from(SeriesTypes)
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
