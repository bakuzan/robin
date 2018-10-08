import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import { Urls, SeriesTypes } from 'src/app/common/constants';
import Series from '../shared/series.model';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import RouteData from 'src/app/common/models/route-data.model';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private seriesId: number;
  private data: RouteData;
  cancelUrl = `/${Urls.seriesList}`;
  seriesForm: NgForm;
  types = mapEnumToSelectOption(SeriesTypes);
  series: Series = new Series();

  constructor(private route: ActivatedRoute, private service: SeriesService) {}

  ngOnInit() {
    this.route.data.subscribe((data: RouteData) => {
      this.data = data;
      if (!data.isCreate) {
        this.seriesId = +this.route.snapshot.paramMap.get('id');
        this.getSeries();
      }
    });
  }

  getSeries() {
    this.service
      .getSeriesById(this.seriesId)
      .subscribe((series) => (this.series = series));
  }

  onSubmit(form) {
    console.log(
      '%c submitted series form',
      'color: brickred',
      form,
      form.value
    );
    if (this.data.isCreate) {
      // add
    } else {
      // update
    }
  }
}
