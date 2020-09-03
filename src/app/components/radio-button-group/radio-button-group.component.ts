import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

import SelectOption, {
  SelectOptionValue
} from 'src/app/common/models/select-option.model';

const OPTION_PREFIX = 'radio';

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true
    }
  ]
})
export class RadioButtonGroupComponent implements OnInit, ControlValueAccessor {
  radioGroupClasses: string;
  onChange: () => void;
  onTouched: () => void;
  @Input()
  id: string;
  @Input()
  value: SelectOptionValue;
  @Input()
  options: SelectOption[];
  @Input()
  column: boolean;

  constructor() {}

  ngOnInit() {
    this.radioGroupClasses = classNames('radio-button-group', {
      'radio-button-group--column': this.column
    });
  }

  getKey(index): string {
    return `${this.id}-${index}`;
  }

  writeValue(value: SelectOptionValue): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  onSelect(val) {
    this.onChange(val);
  }
}
