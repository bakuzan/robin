import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import Series from '../shared/series.model';
import { Urls, SeriesTypes, Icons, Regexes } from 'src/app/common/constants';
import { roundTo2, displayAs2dp } from 'src/app/common/utils';
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
  crossIcon = Icons.cross;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
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
      .subscribe((series) => this.updateForm(series));
  }

  get volumes(): FormArray {
    return this.seriesForm.get('volumes') as FormArray;
  }

  updateForm(series: Series) {
    const volumes = series.volumes || [];

    if (volumes.length && !this.volumes.length) {
      this.volumes.push(this.initVolume());
    }

    this.seriesForm.setValue({
      ...series,
      volumes: volumes.map((x) => ({
        ...x,
        paid: displayAs2dp(x.paid),
        rrp: displayAs2dp(x.rrp)
      }))
    });
  }

  initVolume(
    initialVolumeNumber: number = null,
    rrp: number = null
  ): FormGroup {
    return new FormGroup({
      id: new FormControl(),
      number: new FormControl(initialVolumeNumber || null),
      releaseDate: new FormControl(null),
      boughtDate: new FormControl(null),
      rrp: new FormControl(
        rrp || null,
        Validators.pattern(Regexes.IS_FLOATING_POINT_NUMBER)
      ),
      paid: new FormControl(
        null,
        Validators.pattern(Regexes.IS_FLOATING_POINT_NUMBER)
      ),
      retailerId: new FormControl(),
      usedDiscountCode: new FormControl(false)
    });
  }

  onAddVolume() {
    const initialVolumeNumber = this.volumes.controls.length + 1;
    let rrp = null;

    if (initialVolumeNumber > 1) {
      const lastVolume = this.volumes.controls[0];
      rrp = lastVolume.value.rrp;
    }
    console.log(
      'should add volume here',
      this.seriesForm,
      initialVolumeNumber,
      rrp
    );
    this.volumes.insert(0, this.initVolume(initialVolumeNumber, rrp));
    console.log('volumes after add > ', this.volumes.value);
  }

  onRemoveVolume(index: number) {
    this.volumes.removeAt(index);
  }

  onSubmit() {
    let mutation: Observable<Series>;
    const formValues = this.seriesForm.value;
    const series: Series = {
      ...formValues,
      volumeCount: formValues.volumeCount
        ? Number(formValues.volumeCount)
        : null,
      volumes: formValues.volumes.map((x) => ({
        ...x,
        number: Number(x.number),
        paid: roundTo2(x.paid),
        rrp: roundTo2(x.rrp)
      }))
    };

    if (this.data.isCreate) {
      mutation = this.service.addSeries(series);
    } else {
      mutation = this.service.updateSeries(series);
    }

    mutation.subscribe((response) => {
      if (this.data.isCreate) {
        const targetUrl: string = Urls.build(Urls.seriesView, {
          id: response.id
        });
        this.router.navigateByUrl(targetUrl);
      } else {
        this.updateForm(response);
      }
    });
  }
}
