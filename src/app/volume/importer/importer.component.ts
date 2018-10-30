import { Component, OnInit } from '@angular/core';

import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import SeriesType, {
  SeriesTypes
} from 'src/app/common/models/series-types.enum';
import ImportRow from '../../common/models/import-row.model';
import {
  isValidDate,
  getISOStringDate,
  localDateStringToDate,
  currencyToPlainNumber
} from 'src/app/common/utils';
import { VolumeService } from 'src/app/common/volume.service';

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
  previewData: ImportRow[] = [];

  constructor(private volumeService: VolumeService) {}

  ngOnInit() {}

  async onFileSelect(e) {
    const [file] = e.target.files;
    if (!file) {
      return;
    }

    this.isLoading = true;
    const fileText = await new Response(file).text();
    const rows = fileText.split('\n');
    const data =
      this.type === SeriesType.Manga
        ? this.processMangaImport(rows)
        : this.processComicImport(rows);

    console.log(`Imported ${this.type} data > `, data);
    this.previewData = data;
    this.isLoading = false;
  }

  processMangaImport(rows): ImportRow[] {
    return rows.reduce((p, c) => {
      const [seriesName, number, rrp, _, paid, boughtDate, ...other] = c.split(
        ','
      );
      const retailer = other[4] || '';

      return [
        ...p,
        ...this.mapProcessedStringToImportRow({
          seriesName,
          number,
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
      const [seriesName, number, rrp, paid, _, retailer, boughtDate] = c.split(
        ','
      );

      return [
        ...p,
        ...this.mapProcessedStringToImportRow({
          seriesName,
          number,
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
    number,
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
        number: Number(number),
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
    console.log('form submitted!', this.previewData);
    this.isLoading = true;
    this.volumeService.importVolumes(this.previewData).subscribe((response) => {
      console.log(
        `%c Import was success: ${response.success}`,
        response.messages
      );
      /**
       * Remove preview data
       * Display messages
       *
       */
      this.isLoading = false;
    });
  }
}
