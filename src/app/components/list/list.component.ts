/* eslint-disable @typescript-eslint/naming-convention */
import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import classNames from 'classnames';

import ListColumn from './list-column.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ContentChild(TemplateRef, { static: false })
  itemTemplate: TemplateRef<any>;

  @Input()
  class: string;
  @Input()
  itemClass: string;
  @Input()
  itemCount: number;
  @Input()
  items: Observable<any>;
  @Input()
  columns: ListColumn;
  @Input()
  wrap: boolean;
  @Input()
  fixedWidth: boolean;
  @Input()
  isAsync = true;
  @Input()
  isGrid = false;

  listClasses: string;
  listItemClasses: string;

  ngOnInit() {
    if (!this.isGrid) {
      this.listClasses = classNames('list', this.class, {
        'list--wrap': this.wrap,
        'list--column': this.columns,
        [`list--column_${this.columns}`]: this.columns
      });
      this.listItemClasses = classNames('list__item', this.itemClass, {
        'list__item--fixed-width': this.fixedWidth
      });
    } else {
      this.listClasses = classNames('grid', this.class);
      this.listItemClasses = classNames('grid__item');
    }
  }
}
