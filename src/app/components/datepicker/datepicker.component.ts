import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Renderer2,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { checkDatesAgainstRange } from 'src/app/common/utils/calendar';
import { Icons } from 'src/app/common/constants';

const ErrorMessages = {
  dateIsOutOfRange: 'Date is out of range',
  isRequired: 'Date is required'
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  private clearTimer: any = null;
  errorMessage = '';
  displayCalendar = false;
  onChange: () => void;
  onTouched: () => void;
  calendarIcon = Icons.calendar;
  clearIcon = Icons.cross;
  selected?: string | Date;
  @ViewChild('container', { static: false })
  container: ElementRef;
  @Input()
  class?: string;
  @Input()
  id: string;
  @Input()
  name?: string;
  @Input()
  value?: string | Date;
  @Input()
  label?: string;
  @Input()
  required? = false;
  @Input()
  disabled? = false;
  @Input()
  isFlat? = false;
  @Input()
  afterDate?: string;
  @Input()
  beforeDate?: string;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  writeValue(value: string): void {
    this.selected = value;
  }
  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const input = this.dateInput;
    if (input) {
      this.renderer.setProperty(input, 'disabled', isDisabled);
    }
  }

  get dateInput() {
    const self = this.container && this.container.nativeElement;
    if (self) {
      return self.querySelector('input');
    }

    return null;
  }

  get displayClearButton() {
    return !this.required && !this.disabled && !!this.selected;
  }

  openCalendar() {
    this.displayCalendar = true;
  }

  closeCalendar() {
    this.displayCalendar = false;
  }

  handleDateSelect(date: string) {
    this.closeCalendar();
    this.handleDateChange(date);
  }

  handleDateChange(date: string) {
    const { afterDate, beforeDate, required } = this;
    const dateIsOutOfRange = checkDatesAgainstRange(
      { afterDate, beforeDate },
      date
    );

    this.errorMessage = dateIsOutOfRange
      ? ErrorMessages.dateIsOutOfRange
      : !date && required
      ? ErrorMessages.isRequired
      : null;

    const hasError = !!this.errorMessage;
    this.writeValue(date);
    this.onChange(date, this.name, hasError);
  }

  clearAndFocusInput(): void {
    this.writeValue('');
    this.onChange('');
    clearTimeout(this.clearTimer);

    this.clearTimer = window.setTimeout(() => {
      const element = this.dateInput;

      if (element) {
        element.focus();
      }
    }, 100);
  }
}
