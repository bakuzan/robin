/* tslint:disable:no-output-native */
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  forwardRef,
  Renderer2,
  ElementRef
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
  onChange: (value: string) => void;
  onTouched: (event: Event) => void;
  classes: string;
  clearClasses: string;
  @ViewChild('input', { static: false })
  input: ElementRef;
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
  accept: string;
  @Input()
  pattern?: string;
  @Input()
  placeholder? = ' ';
  @Input()
  min: number;
  @Input()
  max: number;
  @Input()
  step: number;
  @Input()
  maxLength: number;
  @Input()
  readOnly: boolean;
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
        'input-box--clearable': this.isTextInput,
        'input-box--hidden': this.type === 'hidden'
      },
      this.class
    ]);
  }

  writeValue(value: string): void {
    if (!this.input) {
      return;
    }

    const input = this.input.nativeElement;
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
    this.renderer.setProperty(input, 'disabled', isDisabled);
  }

  change(e: Event) {
    const t = e.target as HTMLInputElement;
    this.onChange(t.value);
  }

  handleFocus(e: Event) {
    this.focus.emit(e);
  }
  handleBlur(e: Event) {
    this.onTouched(e);
    this.blur.emit(e);
  }
  handleKeyDown(e: Event) {
    this.keyDown.emit(e);
  }

  get showCount(): boolean {
    return !!this.maxLength || this.hasMaxNumber;
  }

  get countText(): string {
    if (this.maxLength) {
      return `${this.value.length}/${this.maxLength}`;
    }
    if (this.hasMaxNumber) {
      return `out of ${this.max || '?'}`;
    }
    return '';
  }

  clearAndFocusInput(): void {
    this.writeValue('');
    this.onChange('');
    clearTimeout(this.clearTimer);

    this.clearTimer = window.setTimeout(
      () => this.input && this.input.nativeElement.focus(),
      100
    );
  }
}
