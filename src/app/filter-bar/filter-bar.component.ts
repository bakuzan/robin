import { Component, OnInit } from '@angular/core';

import SeriesType from 'src/app/common/constants/series-types';
import { mapEnumToMultiSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  addUrl = 'create';
  seriesTypeOptions = mapEnumToMultiSelectOption(SeriesType);
  search = '';
  types = Array.from(SeriesType);

  constructor() {}

  ngOnInit() {}

  onInput({ name, value }) {
    console.log('filter bar', name, value);
    this[name] = value;
  }
}
