import { Component, OnInit } from '@angular/core';

import { mapEnumToSelectOption } from 'src/app/common/utils/mappers';
import SeriesType, {
  SeriesTypes
} from 'src/app/common/models/series-types.enum';
import ImportRow from './import-row.model';
import {
  isValidDate,
  getISOStringDate,
  localDateStringToDate,
  currencyToPlainNumber
} from 'src/app/common/utils';

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
  previewData: ImportRow[];

  constructor() {}

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

      if (!seriesName) {
        return p;
      }

      const date = getISOStringDate(localDateStringToDate(boughtDate));
      const boughtDateResolved = isValidDate(date) ? date : '';
      return [
        ...p,
        {
          seriesName: seriesName.trim(),
          number: Number(number),
          rrp: currencyToPlainNumber(rrp),
          paid: currencyToPlainNumber(paid),
          boughtDate: boughtDateResolved,
          retailer: retailer.trim()
        }
      ];
    }, []);
  }

  processComicImport(rows): ImportRow[] {
    console.log('%c Comic Import Not Implemented Yet', 'color: firebrick');
    return [];
  }
}
