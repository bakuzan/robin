/* eslint-disable no-underscore-dangle */
import {
  Component,
  OnInit,
  Input,
  Renderer2,
  ViewChild,
  forwardRef,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

@Component({
  selector: 'app-tickbox',
  templateUrl: './tickbox.component.html',
  styleUrls: ['./tickbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TickboxComponent),
      multi: true
    }
  ]
})
export class TickboxComponent implements OnInit, ControlValueAccessor {
  @ViewChild('checkbox', { static: false })
  checkbox: ElementRef;
  @Input()
  name: string;
  @Input()
  checked: boolean;
  @Input()
  disabled: boolean;
  @Input()
  customTickbox: string;

  tickboxClasses: string;
  onTouched: () => void;
  onChange: (_: any) => void;

  constructor(private _renderer: Renderer2) {}

  ngOnInit() {
    this.tickboxClasses = classNames('tickbox', this.customTickbox);
  }

  writeValue(value: boolean): void {
    if (!this.checkbox) {
      return;
    }

    const checkbox = this.checkbox.nativeElement;
    this._renderer.setProperty(checkbox, 'checked', value);
  }
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const checkbox = this.checkbox.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this._renderer.setProperty(checkbox, 'disabled', isDisabled);
    checkbox[action]('input-box--disabled');
  }

  handleChange(value: boolean) {
    if (this.onChange) {
      this.onChange(value);
    }
  }
}
