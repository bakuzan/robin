import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { SeriesService } from '../shared/series.service';
import { VolumeService } from '../../common/volume.service';
import { RetailerService } from 'src/app/common/retailer.service';
import RouteData from 'src/app/common/models/route-data.model';
import Series from '../../common/models/series.model';
import Retailer from 'src/app/common/models/retailer.model';
import Volume, { VolumeInitValues } from '../../common/models/volume.model';
import Aggregate from 'src/app/common/models/aggregate.model';
import SeriesStatus from 'src/app/common/models/series-statuses.enum';
import {
  Urls,
  SeriesTypes,
  SeriesStatuses,
  Icons,
  Regexes
} from 'src/app/common/constants';

import {
  roundTo2,
  displayAs2dp,
  pad,
  capitaliseEachWord
} from 'src/app/common/utils';
import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import SeriesType from 'src/app/common/models/series-types.enum';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  private seriesId: number;
  @ViewChild('chartRef')
  chartRef: ElementRef;
  isLoading = false;
  data: RouteData;
  crossIcon = Icons.cross;
  saveIcon = Icons.save;
  cancelUrl = `/${Urls.seriesList}`;
  cancelQueryParams = {};
  types = mapEnumToSelectOption(SeriesTypes);
  statuses = mapEnumToSelectOption(SeriesStatuses);
  retailers: Retailer[];
  statistics: Aggregate[];
  seriesForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    type: new FormControl(SeriesType.Manga, Validators.required),
    status: new FormControl(SeriesStatus.Ongoing, Validators.required),
    volumeCount: new FormControl(null),
    volumes: new FormArray([])
  });
  displayForm = false;

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
    domain: ['#339933', '#993333']
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
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
        return;
      }

      this.displayForm = true;
    });

    this.seriesForm.controls.volumes.valueChanges.subscribe((volumes) => {
      this.statistics = this.craftStatistics(volumes);
      this.statisticsChartData = this.generateChartData(volumes);
      this.updateChartViewSize();
    });
  }

  getSeries() {
    this.isLoading = true;
    this.seriesService.getSeriesById(this.seriesId).subscribe((series) => {
      const pageName = `View ${capitaliseEachWord(series.name)}`;
      this.titleService.setTitle(`Robin - ${pageName}`);
      this.cancelQueryParams = { type: series.type };
      this.updateForm(series);
      this.displayForm = true;
    });
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
    const paidValues = volumes.map((x) => Number(x.paid)).filter((x) => x);
    const expenditure = displayAs2dp(paidValues.reduce((a, b) => a + b, 0.0));
    const minimum = displayAs2dp(Math.min(...paidValues));
    const maximum = displayAs2dp(Math.max(...paidValues));

    const average = displayAs2dp(
      volumes.reduce((p, c) => {
        const value = parseFloat(c.paid);
        return isNaN(value) ? p : p + value;
      }, 0) / volumes.filter((x) => !isNaN(parseFloat(x.paid))).length
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
      { label: 'Dearest', value: `£ ${maximum}` },
      { label: 'Best deal', value: `${bestDeal}%` },
      { label: 'Worst deal', value: `${worstDeal}%` },
      { label: 'Expenditure', value: `£ ${expenditure}` }
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
    if (!series) {
      return;
    }

    const volumes = series.volumes || [];
    if (volumes.length && !this.volumes.length) {
      volumes.forEach(() => this.volumes.push(this.initVolume()));
    }

    window.setTimeout(() => {
      this.seriesForm.setValue({
        ...series,
        volumes: volumes.map((x) => ({
          ...x,
          paid: displayAs2dp(x.paid),
          rrp: displayAs2dp(x.rrp)
        }))
      });
      this.isLoading = false;
    }, 0);
  }

  updateRetailers(data: any) {
    if (!data.retailer && !data.volumes) {
      return;
    }

    const retailers: Retailer[] = data.retailer
      ? [data.retailer]
      : data.volumes.map((x) => x.retailer);

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
    let initialVolumeNumber = this.volumes.controls.length + 1,
      rrp = null,
      retailer = null;

    if (initialVolumeNumber > 1) {
      const lastVolume = this.volumes.controls[0];
      const prev = lastVolume.value;
      initialVolumeNumber = prev.number + 1;
      rrp = prev.rrp;
      retailer = prev.retailer;
    }

    const initialValues: VolumeInitValues = {
      number: initialVolumeNumber,
      rrp,
      retailer
    };

    this.volumes.insert(0, this.initVolume(initialValues));
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

    this.isLoading = true;
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
      this.isLoading = false;
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

    this.isLoading = true;
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

  updateChartViewSize() {
    const width =
      (this.chartRef && this.chartRef.nativeElement.offsetWidth) || 0;

    this.view = [width, 400];
  }

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }
}
