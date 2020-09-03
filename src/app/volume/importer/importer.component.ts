import { Component, OnInit } from '@angular/core';

import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import SeriesType, {
  SeriesTypes
} from 'src/app/common/models/series-types.enum';
import ImportRow from '../../common/models/import-row.model';
import DateRangeFilter from 'src/app/common/models/date-range-filter.model';
import {
  isValidDate,
  getISOStringDate,
  localDateStringToDate,
  currencyToPlainNumber,
  getDaysAgo
} from 'src/app/common/utils';
import { VolumeService } from 'src/app/common/volume.service';
import { DownloadService } from 'src/app/common/download.service';
import whenRecordsBegan from 'src/app/common/constants/when-records-began';

const today = new Date();

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  isLoading = false;
  seriesTypeOptions = mapEnumToSelectOption(SeriesTypes);
  type = SeriesType.Manga;
  importData = '';
  isPreview = false;
  messages: string[] = [];
  previewData: ImportRow[] = [];
  filters: DateRangeFilter = {
    fromDate: getISOStringDate(getDaysAgo(today, 365)),
    toDate: getISOStringDate(today)
  };
  whenRecordsBegan = whenRecordsBegan;

  constructor(
    private volumeService: VolumeService,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {}

  async onFileSelect(e: Event) {
    const fileElement = e.target as HTMLInputElement;
    const [file] = Array.from(fileElement.files);
    if (!file) {
      return;
    }

    this.isLoading = true;
    this.messages = [];

    const fileText = await new Response(file).text();
    const rows = fileText.split('\n');
    const data =
      this.type === SeriesType.Manga
        ? this.processMangaImport(rows)
        : this.processComicImport(rows);

    this.previewData = data;
    this.isPreview = true;
    this.isLoading = false;
  }

  processMangaImport(rows): ImportRow[] {
    return rows.reduce((p, c) => {
      const [seriesName, num, rrp, _, paid, boughtDate, ...other] = c.split(
        ','
      );
      const retailer = other[4] || '';

      return [
        ...p,
        ...this.mapProcessedStringToImportRow({
          seriesName,
          number: num,
          rrp,
          paid,
          retailer,
          boughtDate
        })
      ];
    }, []);
  }

  processComicImport(rows): ImportRow[] {
    return rows.reduce((p, c) => {
      const [seriesName, num, rrp, paid, _, retailer, boughtDate] = c.split(
        ','
      );

      return [
        ...p,
        ...this.mapProcessedStringToImportRow({
          seriesName,
          number: num,
          rrp,
          paid,
          retailer,
          boughtDate
        })
      ];
    }, []);
  }

  mapProcessedStringToImportRow({
    seriesName,
    number: num,
    rrp,
    paid,
    retailer,
    boughtDate
  }): ImportRow[] {
    if (!seriesName) {
      return [];
    }

    const date = getISOStringDate(localDateStringToDate(boughtDate));
    const boughtDateResolved = isValidDate(date) ? date : '';
    return [
      {
        series: {
          name: seriesName.trim(),
          type: SeriesType.Comic
        },
        number: Number(num),
        rrp: currencyToPlainNumber(rrp),
        paid: currencyToPlainNumber(paid),
        boughtDate: boughtDateResolved,
        retailer: {
          name: retailer.trim()
        }
      }
    ];
  }

  onSubmit() {
    this.isLoading = true;
    this.volumeService
      .importVolumes(this.previewData, this.type)
      .subscribe((response) => {
        this.isPreview = false;
        this.previewData = [];
        this.messages = response.messages;
        this.isLoading = false;
      });
  }

  onClear() {
    this.isPreview = false;
    this.previewData = [];
    this.messages = [];
    this.isLoading = false;
  }

  onExport() {
    this.isLoading = true;
    this.messages = [];

    this.volumeService
      .exportVolumes({ ...this.filters, type: this.type })
      .subscribe((response) => {
        this.isLoading = false;
        this.messages = response.messages;

        if (response.success) {
          const filename = `robin-volume-export_type=${this.type}&from=${this.filters.fromDate}&to=${this.filters.toDate}`;

          this.downloadService.downloadCSV(filename, response.data);
        }
      });
  }
}
