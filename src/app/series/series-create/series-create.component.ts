import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgForm,
  FormArray,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import Volume from '../shared/volume.model';
import Series from '../shared/series.model';
import { Urls, SeriesTypes } from 'src/app/common/constants';
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
  @ViewChild('seriesForm')
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  series: Series = new Series();
  seriesForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
    volumeCount: new FormControl(null),
    volumes: new FormArray([])
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SeriesService
  ) {}

  ngOnInit() {
    console.log('INIT', this);
    this.route.data.subscribe((data: RouteData) => {
      this.data = data;
      if (!data.isCreate) {
        console.log('init - is not create', this.seriesForm);
        this.seriesId = +this.route.snapshot.paramMap.get('id');
        this.getSeries();
      }
    });
  }

  getSeries() {
    this.service
      .getSeriesById(this.seriesId)
      .subscribe((series) =>
        this.seriesForm.setValue({ ...series, volumes: series.volumes || [] })
      );
  }

  get volumes(): FormArray {
    return this.seriesForm.get('volumes') as FormArray;
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

  onAddVolume() {
    console.log('should add volume here', this.seriesForm);
    this.volumes.push(
      new FormGroup({
        number: new FormControl(),
        rrp: new FormControl(),
        paid: new FormControl()
      })
    );
  }
}
