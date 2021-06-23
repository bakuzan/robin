/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-aggregate-widget',
  templateUrl: './aggregate-widget.component.html',
  styleUrls: ['./aggregate-widget.component.scss']
})
export class AggregateWidgetComponent implements OnInit {
  @Input()
  items: any[];
  @Input()
  center: boolean;

  classes: string;

  constructor() {}

  ngOnInit() {
    this.classes = classNames('statistics__widget', {
      'statistics__widget--center': this.center
    });
  }
}
