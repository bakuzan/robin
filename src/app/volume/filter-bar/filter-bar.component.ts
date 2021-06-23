import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import VolumeFilter from '../shared/volume-filter.model';
import { SeriesTypes } from '../../common/models/series-types.enum';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import whenRecordsBegan from 'src/app/common/constants/when-records-began';

@Component({
  selector: 'app-volume-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input()
  filters: VolumeFilter;
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  values: VolumeFilter;
  whenRecordsBegan = whenRecordsBegan;

  constructor() {}

  ngOnInit() {
    this.values = { ...this.filters };
  }

  onInput() {
    this.update.emit({ ...this.values });
  }
}
