import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import SeriesType, { SeriesTypes } from '../shared/series-types.enum';
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
  types: SeriesType[] = Array.from(SeriesTypes);
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onInput() {
    console.log('update!', this.search, this.types);
    this.update.emit({ search: this.search, types: this.types });
  }
}
