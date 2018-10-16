import { Component, OnInit, Input } from '@angular/core';

import Volume from 'src/app/common/models/volume.model';
import { pad, displayAs2dp } from 'src/app/common/utils';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit {
  @Input()
  isFirst = false;
  @Input()
  item: Volume;

  constructor() {}

  ngOnInit() {}

  padNumber(num): string {
    return pad(`${num}`, 3);
  }

  rounded(num): string {
    return displayAs2dp(num);
  }
}
