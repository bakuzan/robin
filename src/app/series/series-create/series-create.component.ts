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
import Volume, { VolumeInitValues } from '../../common/models/volume.model';
import Aggregate from 'src/app/common/models/aggregate.model';
import { Urls, SeriesTypes, Icons, Regexes } from 'src/app/common/constants';
import { roundTo2, displayAs2dp, pad } from 'src/app/common/utils';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private seriesId: number;
  data: RouteData;
  crossIcon = Icons.cross;
  saveIcon = Icons.save;
  cancelUrl = `/${Urls.seriesList}`;
  types = mapEnumToSelectOption(SeriesTypes);
  retailers: Retailer[];
  statistics: Aggregate[];
  seriesForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
    volumeCount: new FormControl(null),
    volumes: new FormArray([])
  });

  statisticsChartData: any[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Volume';
  yAxisLabel = 'Cost (£)';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seriesService: SeriesService,
    private volumeService: VolumeService,
    private retailerService: RetailerService
  ) {}

  ngOnInit() {
    this.getRetailers();
    this.route.data.subscribe((data: RouteData) => {
      this.data = data;
      if (!data.isCreate) {
        this.seriesId = +this.route.snapshot.paramMap.get('id');
        this.getSeries();
      }
    });

    this.seriesForm.controls.volumes.valueChanges.subscribe((volumes) => {
      console.log('volume change > ', volumes);
      this.statistics = this.craftStatistics(volumes);
      this.statisticsChartData = this.generateChartData(volumes);
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

  craftStatistics(volumes = []): Aggregate[] {
    const average = displayAs2dp(
      volumes.reduce((p, c) => {
        const value = parseFloat(c.paid);
        return isNaN(value) ? p : p + value;
      }, 0) / volumes.filter((x) => !isNaN(parseFloat(x.paid))).length
    );
    const minimum = displayAs2dp(
      Math.min(...volumes.map((x) => x.paid).filter((x) => x))
    );
    const maximum = displayAs2dp(
      Math.max(...volumes.map((x) => x.paid).filter((x) => x))
    );

    const ratios = volumes
      .map((x) => (x.paid && x.rrp ? x.paid / x.rrp : 0))
      .filter((x) => x);
    const bestDeal = displayAs2dp(
      ratios.reduce((p, c) => (p < c ? p : c), 100) * 100
    );
    const worstDeal = displayAs2dp(
      ratios.reduce((p, c) => (p > c ? p : c), null) * 100
    );

    return [
      { label: 'Average', value: `£ ${average}` },
      { label: 'Cheapest', value: `£ ${minimum}` },
      { label: 'Best deal', value: `${bestDeal}%` },
      { label: 'Dearest', value: `£ ${maximum}` },
      { label: 'Worst deal', value: `${worstDeal}%` }
    ];
  }

  generateChartData(volumes = []): any[] {
    const chartSrc = volumes.slice(0).reverse();

    const paidSeries = chartSrc.map((x) => ({
      name: `#${pad(`${x.number ? x.number : ''}`, 3, '0')}`,
      value: x.paid
    }));

    const rrpSeries = chartSrc.map((x) => ({
      name: `#${pad(`${x.number ? x.number : ''}`, 3, '0')}`,
      value: x.rrp
    }));

    return [
      {
        name: 'Paid',
        series: paidSeries
      },
      {
        name: 'RRP',
        series: rrpSeries
      }
    ];
  }

  updateForm(series: Series) {
    const volumes = series.volumes || [];

    if (volumes.length && !this.volumes.length) {
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

  updateRetailers(data: any) {
    if (!data.retailer && !data.volumes) {
      return;
    }

    const retailers: Retailer[] = data.retailer
      ? [data.retailer]
      : data.volumes.map((x) => x.retailer);
    console.log('up retail', retailers, this.retailers);
    this.retailers = [
      ...this.retailers,
      ...retailers.filter((x) => this.retailers.every((y) => y.id !== x.id))
    ];
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

  processVolumePrePost(x): Volume {
    const { releaseDate, boughtDate, usedDiscountCode, seriesId } = x;
    const retailer = !x.retailer
      ? { retailerId: null }
      : typeof x.retailer.id === 'string'
        ? ({ retailer: { name: x.retailer.name } } as any)
        : { retailerId: x.retailer.id };

    return {
      id: x.id ? x.id : undefined,
      number: Number(x.number),
      paid: roundTo2(x.paid),
      rrp: roundTo2(x.rrp),
      releaseDate,
      boughtDate,
      usedDiscountCode,
      seriesId,
      ...retailer
    };
  }

  onSaveVolume(index: number) {
    let mutation;
    const value = this.volumes.value[index];
    const volume = this.processVolumePrePost({
      ...value,
      seriesId: this.seriesId
    });
    console.log('save > ', this.volumes, index, volume);
    if (!volume.id) {
      mutation = this.volumeService.addVolume(volume);
    } else {
      mutation = this.volumeService.updateVolume(volume);
    }

    mutation.subscribe((response) => {
      const vol = this.volumes.at(index);
      vol.patchValue({
        ...response,
        paid: displayAs2dp(response.paid),
        rrp: displayAs2dp(response.rrp)
      });
      vol.markAsPristine();
      this.updateRetailers(response);
    });
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
      volumes: formValues.volumes.map(this.processVolumePrePost)
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
        this.updateRetailers(response);
      }
    });
  }
}
