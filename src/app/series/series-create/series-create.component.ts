import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private seriesId: string;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  series$: Observable<Series>;

  constructor(private route: ActivatedRoute, private service: SeriesService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.seriesId = params['id'];
      console.log(this, this.seriesId);
      if (this.seriesId) {
        this.series$ = this.service.getSeriesById(this.seriesId);
      } else {
        this.series$ = of(new Series());
      }
    });
  }
}
