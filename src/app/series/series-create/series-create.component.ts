import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import { Urls, SeriesTypes } from 'src/app/common/constants';
import Series from '../shared/series.model';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private seriesId: number;
  cancelUrl = `/${Urls.seriesList}`;
  seriesForm: NgForm;
  types = mapEnumToSelectOption(SeriesTypes);
  series: Series;

  constructor(private route: ActivatedRoute, private service: SeriesService) {}

  ngOnInit() {
    this.seriesId = +this.route.snapshot.paramMap.get('id');

    if (this.seriesId) {
      this.getSeries();
    } else {
      this.series = new Series();
    }
  }

  getSeries() {
    this.service
      .getSeriesById(this.seriesId)
      .subscribe((series) => (this.series = series));
  }

  onInput({ value, name }) {
    this.series[name] = value;
  }

  onSubmit(event) {
    console.log(
      '%c submitted series form',
      'color: brickred',
      event,
      this.seriesId,
      this.series
    );
  }
}
