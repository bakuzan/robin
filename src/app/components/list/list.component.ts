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
  @ContentChild(TemplateRef)
  itemTemplate: TemplateRef<any>;
  listClasses: string;
  listItemClasses: string;
  @Input()
  class: string;
  @Input()
  itemClass: string;
  @Input()
  items: Observable<any>;
  @Input()
  columns: ListColumn;
  @Input()
  wrap: boolean;
  @Input()
  fixedWidth: boolean;

  ngOnInit() {
    this.listClasses = classNames('list', this.class, {
      'list--wrap': this.wrap,
      'list--column': this.columns,
      [`list--column_${this.columns}`]: this.columns
    });
    this.listItemClasses = classNames('list__item', this.itemClass, {
      'list__item--fixed-width': this.fixedWidth
    });
  }
}
