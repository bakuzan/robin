import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {
  selectClasses: string;
  @Input()
  label: string;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  value: string;
  @Input()
  disabled: boolean;
  @Input()
  required: boolean;
  @Input()
  options: number[];
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.selectClasses = classNames('select-box', 'has-float-label');
  }

  handleChange(value) {
    this.update.emit({ value, name: this.name });
  }
}
