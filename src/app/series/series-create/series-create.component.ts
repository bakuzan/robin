import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  private isCreate: boolean;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  series$: Observable<Series>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SeriesService
  ) {}

  ngOnInit() {
    console.log(this);
    this.isCreate = true;
    if (this.isCreate) {
      this.series$ = of(new Series());
    } else {
      this.series$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.service.getSeries(params.get('id'))
        )
      );
    }
  }
}
