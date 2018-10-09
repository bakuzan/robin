import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

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
  types = mapEnumToSelectOption(SeriesTypes);
  series: Series = new Series();
  seriesForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SeriesService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: RouteData) => {
      this.data = data;
      if (!data.isCreate) {
        console.log('init - is not create');
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
    let mutation: Observable<Series>;
    const formValues = form.value;
    const series = {
      ...formValues,
      volumeCount: formValues.volumeCount
        ? Number(formValues.volumeCount)
        : null
    };

    if (this.data.isCreate) {
      mutation = this.service.addSeries(series);
    } else {
      mutation = this.service.updateSeries(series);
    }

    mutation.subscribe((response) => {
      this.series = response;
      if (this.data.isCreate) {
        const targetUrl = Urls.build(Urls.seriesView, { id: response.id });
        this.router.navigateByUrl(targetUrl);
      }
    });
  }
}
