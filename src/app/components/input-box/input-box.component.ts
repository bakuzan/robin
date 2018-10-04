import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import classNames from 'classnames';

import { Icons } from 'src/app/common/constants';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  private clearTimer: any = null;
  icon: string = Icons.cross;
  isTextInput: boolean;
  hasMaxNumber: boolean;
  @ViewChild('input')
  input;
  @Input()
  id: string;
  @Input()
  class: string;
  @Input()
  name: string;
  @Input()
  type = 'text';
  @Input()
  label = 'search';
  @Input()
  value;
  @Input()
  min: number;
  @Input()
  max: number;
  @Input()
  maxLength: number;
  @Output()
  update: EventEmitter<any> = new EventEmitter();
  @Output()
  blur: EventEmitter<any> = new EventEmitter();
  @Output()
  focus: EventEmitter<any> = new EventEmitter();
  @Output()
  keyDown: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.isTextInput = this.type === 'text';
    this.hasMaxNumber = this.type === 'number' && !isNaN(this.max);
  }

  onChange(value) {
    this.update.emit({ value, name: this.name });
  }

  handleFocus(e) {
    this.focus.emit(e);
  }
  handleBlur(e) {
    this.blur.emit(e);
  }
  handleKeyDown(e) {
    this.keyDown.emit(e);
  }

  classes() {
    const notClearable = this.isTextInput;
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

  showCount(): boolean {
    return !!this.maxLength || this.hasMaxNumber;
  }

  countText(): string {
    if (this.maxLength) {
      return `${this.value.length}/${this.maxLength}`;
    }
    if (this.hasMaxNumber) {
      return `out of ${this.max || '?'}`;
    }
    return '';
  }

  clearAndFocusInput(): void {
    this.value = '';
    clearTimeout(this.clearTimer);

    this.clearTimer = window.setTimeout(
      () => this.input && this.input.nativeElement.focus(),
      100
    );
  }
}
