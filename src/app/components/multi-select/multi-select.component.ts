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
  onChange: () => void;
  onTouched: () => void;

  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  placeholder: string;
  @Input()
  value: SelectOptionValue[] = [];
  @Input()
  options: SelectOption[];
  @Input()
  listClassName: string;

  constructor() {}

  ngOnInit() {
    this.selectAllName = `${this.id}--selectAll`;
    this.dropdownClasses = this.getDropdownClasses();
  }

  get lastCheckBoxId() {
    const lastIndex = this.options.length - 1;
    return `${this.getName(lastIndex)}-tickbox`;
  }

  writeValue(obj: SelectOptionValue[]): void {
    this.value = obj || [];
    this.update(obj, true);
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

  getName(i: number) {
    return `${this.id}--${OPTION_PREFIX}${i}`;
  }

  getDisplayValue(values: SelectOptionValue[]): string {
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

  checkIfAllSelected(values: SelectOptionValue[]): boolean {
    return values && values.length === this.options.length;
  }

  handleToggleOpen(e: Event) {
    if (e.type !== Strings.events.click) {
      const key = (e as KeyboardEvent).key;
      if (!OPEN_KEYS.includes(key)) {
        return;
      }
    }

    e.stopPropagation();
    this.isOpen = true;
  }

  handleToggleClose() {
    this.isOpen = false;
  }

  handleOptionChange(optionValue: SelectOptionValue) {
    const newValues = this.value.includes(optionValue)
      ? this.value.filter((x) => x !== optionValue)
      : [...this.value, optionValue];

    this.update(newValues);
  }

  handleSelectAll(value: boolean) {
    const newValues = value ? this.options.map((x) => x.value) : [];

    this.update(newValues);
  }

  updateFocusOnClose() {
    const inp = document.getElementById(`${this.id}-multiselect`);

    if (inp) {
      requestAnimationFrame(() => inp.focus());
    }
  }

  private update(newValues: SelectOptionValue[], blockChange = false) {
    if (!blockChange) {
      this.onChange(newValues);
      this.writeValue(newValues);
    }
    this.displayValue = this.getDisplayValue(newValues);
    this.hasAllSelected = this.checkIfAllSelected(newValues);
  }
}
