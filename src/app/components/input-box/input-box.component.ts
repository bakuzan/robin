import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  forwardRef,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

import { Icons } from 'src/app/common/constants';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBoxComponent),
      multi: true
    }
  ]
})
export class InputBoxComponent implements OnInit, ControlValueAccessor {
  private clearTimer: any = null;
  icon: string = Icons.cross;
  isTextInput: boolean;
  hasMaxNumber: boolean;
  onChange: Function;
  onTouched: Function;
  classes: string;
  clearClasses: string;
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
  step: number;
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

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.isTextInput = this.type === 'text';
    this.hasMaxNumber = this.type === 'number' && !isNaN(this.max);
    this.clearClasses = classNames(['input-box__clear']);
    this.classes = classNames([
      'input-box',
      'input-container',
      'has-float-label',
      {
        'input-box--not-clearable': this.isTextInput,
        'input-box--hidden': this.type === 'hidden'
      },
      this.class
    ]);
  }

  writeValue(value: string): void {
    const input = this.input.nativeElement;
    console.log(input, value);
    this.renderer.setProperty(input, 'value', value);
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const input = this.input.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer.setProperty(input, 'disabled', isDisabled);
    input[action]('input-box--disabled');
  }

  change(value) {
    this.onChange(value);
  }

  handleFocus(e) {
    this.focus.emit(e);
  }
  handleBlur(e) {
    this.onTouched(e);
    this.blur.emit(e);
  }
  handleKeyDown(e) {
    this.keyDown.emit(e);
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
