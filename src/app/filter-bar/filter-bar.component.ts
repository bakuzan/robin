import { Component, OnInit } from '@angular/core';

import { SeriesTypes } from 'src/app/common/constants/series-types';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  addUrl = 'create';
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  search = '';
  types = Array.from(SeriesTypes);

  constructor() {}

  ngOnInit() {}

  onInput({ name, value }) {
    this[name] = value;
  }
}
