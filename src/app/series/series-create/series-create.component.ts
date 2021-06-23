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
import { isVolume } from 'src/app/common/guards/volume';
import { isSeries } from 'src/app/common/guards/series';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  @ViewChild('chartRef', { static: false })
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

  private seriesId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private seriesService: SeriesService,
    private volumeService: VolumeService,
    private retailerService: RetailerService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.updateChartViewSize();
  }

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
      this.titleService.setTitle(`${pageName} | Robin`);
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

  craftStatistics(volumes: Volume[] = []): Aggregate[] {
    const paidValues = volumes.map((x) => Number(x.paid)).filter((x) => x);
    const expenditure = displayAs2dp(paidValues.reduce((a, b) => a + b, 0.0));
    const minimum = displayAs2dp(Math.min(...paidValues));
    const maximum = displayAs2dp(Math.max(...paidValues));

    const boughtVolumeCount = volumes.filter((x) => x.boughtDate !== null)
      .length;

    const totalPaid = volumes.reduce((p, c) => {
      const value = parseFloat(`${c.paid}`);
      return isNaN(value) ? p : p + value;
    }, 0);

    const average = displayAs2dp(totalPaid / boughtVolumeCount);

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

  generateChartData(volumes: Volume[] = []): any[] {
    const chartSrc = volumes
      .slice(0)
      .filter((x) => x.boughtDate !== null)
      .reverse();

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

  updateRetailers(data: Series | Volume) {
    const ignoreVolume = isVolume(data) && !data.retailer;
    const ignoreSeries = isSeries(data) && !data.volumes;
    if (ignoreVolume && ignoreSeries) {
      return;
    }

    const retailers: Retailer[] = isVolume(data)
      ? data.retailer
        ? [data.retailer]
        : []
      : data.volumes.map((x: Volume) => x.retailer).filter((x) => !!x);

    this.retailers = [
      ...this.retailers,
      ...retailers.filter((x) => this.retailers.every((y) => y.id !== x.id))
    ];
  }

  initVolume(initValues: VolumeInitValues = new VolumeInitValues()): FormGroup {
    const { number: num, rrp, retailer } = initValues;
    const isFloatCheck = Validators.pattern(Regexes.IS_FLOATING_POINT_NUMBER);

    return new FormGroup({
      id: new FormControl(),
      number: new FormControl(num, Validators.required),
      releaseDate: new FormControl(null),
      boughtDate: new FormControl(null),
      rrp: new FormControl(rrp, isFloatCheck),
      paid: new FormControl(null, isFloatCheck),
      retailer: new FormControl(retailer),
      usedDiscountCode: new FormControl(false)
    });
  }

  onAddVolume() {
    let initialVolumeNumber = this.volumes.controls.length + 1;
    let rrp = null;
    let retailer = null;

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

    const group = this.initVolume();
    this.volumes.insert(0, group);

    // It doesn't like to display the values if initialised with them...
    requestAnimationFrame(() => group.patchValue(initialValues));
  }

  processVolumePrePost(x: Volume): Volume {
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
    let mutation: Observable<Volume>;

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
}
