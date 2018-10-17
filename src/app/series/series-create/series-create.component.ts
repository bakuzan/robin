import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import { VolumeService } from '../../common/volume.service';
import { RetailerService } from 'src/app/common/retailer.service';
import RouteData from 'src/app/common/models/route-data.model';
import Series from '../../common/models/series.model';
import Retailer from 'src/app/common/models/retailer.model';
import { VolumeInitValues } from '../../common/models/volume.model';
import { Urls, SeriesTypes, Icons, Regexes } from 'src/app/common/constants';
import { roundTo2, displayAs2dp } from 'src/app/common/utils';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private seriesId: number;
  private data: RouteData;
  crossIcon = Icons.cross;
  saveIcon = Icons.save;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  retailers: Retailer[];
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
    private seriesService: SeriesService,
    private volumeService: VolumeService,
    private retailerService: RetailerService
  ) {}

  ngOnInit() {
    console.log('INIT', this);
    this.getRetailers();
    this.route.data.subscribe((data: RouteData) => {
      this.data = data;
      if (!data.isCreate) {
        console.log('init - is not create', this.seriesForm);
        this.seriesId = +this.route.snapshot.paramMap.get('id');
        this.getSeries();
      }
    });

    this.seriesForm.valueChanges.subscribe((...test) => {
      console.log(this.seriesForm, 'form status change > ', test);
    });
  }

  getSeries() {
    this.seriesService
      .getSeriesById(this.seriesId)
      .subscribe((series) => this.updateForm(series));
  }

  getRetailers() {
    this.retailerService
      .getRetailers()
      .subscribe((result) => (this.retailers = result));
  }

  get volumes(): FormArray {
    return this.seriesForm.get('volumes') as FormArray;
  }

  updateForm(series: Series) {
    const volumes = series.volumes || [];

    if (volumes.length && !this.volumes.length) {
      console.log('volumes mismatch...');
      volumes.forEach(() => this.volumes.push(this.initVolume()));
    }

    console.log('update form > ', series);
    window.setTimeout(() => {
      this.seriesForm.setValue({
        ...series,
        volumes: volumes.map((x) => ({
          ...x,
          paid: displayAs2dp(x.paid),
          rrp: displayAs2dp(x.rrp)
        }))
      });
    }, 0);
  }

  initVolume(initValues: VolumeInitValues = new VolumeInitValues()): FormGroup {
    const { number, rrp, retailer } = initValues;
    return new FormGroup({
      id: new FormControl(),
      number: new FormControl(number, Validators.required),
      releaseDate: new FormControl(null),
      boughtDate: new FormControl(null),
      rrp: new FormControl(
        rrp,
        Validators.pattern(Regexes.IS_FLOATING_POINT_NUMBER)
      ),
      paid: new FormControl(
        null,
        Validators.pattern(Regexes.IS_FLOATING_POINT_NUMBER)
      ),
      retailer: new FormControl(retailer),
      usedDiscountCode: new FormControl(false)
    });
  }

  onAddVolume() {
    const initialVolumeNumber = this.volumes.controls.length + 1;
    let rrp = null,
      retailer = null;

    if (initialVolumeNumber > 1) {
      const lastVolume = this.volumes.controls[0];
      const prev = lastVolume.value;
      rrp = prev.rrp;
      retailer = prev.retailer;
    }

    const initialValues: VolumeInitValues = {
      number: initialVolumeNumber,
      rrp,
      retailer
    };
    console.log('should add volume here', this.seriesForm, initialValues);
    this.volumes.insert(0, this.initVolume(initialValues));
    console.log('volumes after add > ', this.volumes.value);
  }

  onSaveVolume(index: number) {
    let mutation;
    const value = this.volumes.value[index];
    const volume = {
      ...value,
      seriesId: this.seriesId,
      number: Number(value.number),
      rrp: roundTo2(value.rrp),
      paid: roundTo2(value.paid)
    };
    console.log('save > ', this.volumes, index, volume);
    if (!volume.id) {
      mutation = this.volumeService.addVolume(volume);
    } else {
      mutation = this.volumeService.updateVolume(volume);
    }

    mutation.subscribe((response) =>
      this.volumes.at(index).patchValue(response)
    );
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
        id: x.id ? x.id : undefined,
        number: Number(x.number),
        paid: roundTo2(x.paid),
        rrp: roundTo2(x.rrp)
      }))
    };

    if (this.data.isCreate) {
      mutation = this.seriesService.addSeries(series);
    } else {
      mutation = this.seriesService.updateSeries(series);
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
