import { Component, OnInit } from '@angular/core';

import { Urls } from 'src/app/common/constants';

@Component({
  selector: 'app-series-create',
  templateUrl: './series-create.component.html',
  styleUrls: ['./series-create.component.scss']
})
export class SeriesCreateComponent implements OnInit {
  cancelUrl = `/${Urls.seriesList}`;

  constructor() {}

  ngOnInit() {}
}
