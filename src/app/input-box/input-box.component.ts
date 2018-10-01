import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

import { getEventValue } from 'src/app/common/utils';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input()
  id: string;
  @Input()
  class: string;
  @Input()
  name: string;
  @Input()
  type = 'text';
  @Input()
  value;
  @Input()
  max: number;
  @Input()
  maxLength: number;
  @Output()
  change: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  keydown: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log('input', this);
  }

  onChange(value) {
    console.log('changed', this.name, value);
    this.change.emit({ value, name: this.name });
  }

  onFocus(e) {
    this.focus.emit(e);
  }
  onBlur(e) {
    this.blur.emit(e);
  }
  onKeyDown(e) {
    this.keydown.emit(e);
  }

  showClearButton() {
    return !!this.value && this.isTextInput;
  }

  isTextInput() {
    return this.type === 'text';
  }

  classes() {
    const notClearable = !!this.isTextInput;
    return classNames([
      'input-box',
      'input-container',
      'has-float-label',
      {
        'input-box--not-clearable': notClearable
      },
      this.class
    ]);
  }

  clearClasses() {
    return classNames(['input-box__clear']);
  }

  hasMaxNumber() {
    return this.type === 'number' && !isNaN(this.max);
  }

  showCount() {
    return !!this.maxLength || this.hasMaxNumber;
  }

  countText() {
    if (this.maxLength) {
      return `${this.value.length}/${this.maxLength}`;
    }
    if (this.hasMaxNumber) {
      return `out of ${this.max || '?'}`;
    }
    return '';
  }
}
