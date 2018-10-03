import { Component, OnInit } from '@angular/core';

import { Urls, SeriesTypes } from 'src/app/common/constants';
import Series from 'src/app/common/models/series.model';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private isCreate: boolean;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  series: Series;

  constructor() {}

  ngOnInit() {
    console.log(this);
    this.isCreate = true;
    if (this.isCreate) {
      this.series = new Series();
    } else {
    }
  }
}
