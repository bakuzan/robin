import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

import SelectOption, {
  SelectOptionValue
} from 'src/app/common/models/select-option.model';
import { Strings, OPEN_KEYS } from 'src/app/common/constants';

const OPTION_PREFIX = 'option-';
const ALL_SELECTED_TEXT = 'All Selected';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true
    }
  ]
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  selectAllName: string;
  dropdownClasses: string;
  isOpen = false;
  displayValue: string;
  hasAllSelected: boolean;
  onChange: Function;
  onTouched: Function;
  optionsSelected: any[];
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  placeholder: string;
  @Input()
  value: SelectOptionValue[];
  @Input()
  options: SelectOption[];
  @Input()
  listClassName: string;

  constructor() {}

  ngOnInit() {
    this.selectAllName = `${this.id}--selectAll`;
    this.dropdownClasses = this.getDropdownClasses();
    this.optionsSelected = this.options.map((x) => ({
      ...x,
      selected: false
    }));
  }

  writeValue(obj: SelectOptionValue[]): void {
    this.value = obj;
    const value = this.value;

    /* Set derived values 
      - display text
      - check all state
      - selected options
    */
    this.displayValue = this.getDisplayValue(value);
    this.hasAllSelected = this.checkIfAllSelected(value);
    this.optionsSelected.forEach(
      (x) => (x.selected = value && value.includes(x.value))
    );
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

  getDropdownClasses(): string {
    return classNames('multi-select__dropdown-container', this.listClassName);
  }

  getName(i) {
    return `${this.id}--${OPTION_PREFIX}${i}`;
  }

  getDisplayValue(values): string {
    const length = values && values.length;
    if (!length) {
      return '';
    } else if (length === this.options.length) {
      return ALL_SELECTED_TEXT;
    } else if (length === 1) {
      return this.options.find((x) => values.includes(x.value)).text;
    }
    return `${length} selected`;
  }

  checkIfAllSelected(values): boolean {
    return values && values.length === this.options.length;
  }

  handleToggleOpen(e) {
    if (e.type !== Strings.events.click && !OPEN_KEYS.includes(e.keyCode)) {
      return;
    }
    e.stopPropagation();
    this.isOpen = true;
  }

  handleToggleClose() {
    this.isOpen = false;
  }

  handleOptionChange() {
    const value = this.optionsSelected
      .filter((x) => x.selected)
      .map((x) => x.value);

    this.onChange(value);

    this.displayValue = this.getDisplayValue(value);
    this.hasAllSelected = this.checkIfAllSelected(value);
  }

  handleSelectAll(value) {
    const newValues = value ? this.options.map((x) => x.value) : [];
    this.optionsSelected.forEach((x) => (x.selected = value));

    this.onChange(newValues);
    this.displayValue = this.getDisplayValue(newValues);
    this.hasAllSelected = this.checkIfAllSelected(newValues);
  }
}
