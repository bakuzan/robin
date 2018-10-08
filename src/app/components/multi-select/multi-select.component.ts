import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  Injector,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl
} from '@angular/forms';
import classNames from 'classnames';

import SelectOption, {
  SelectOptionValue
} from 'src/app/common/models/select-option.model';
import { Strings, OPEN_KEYS } from 'src/app/common/constants';

const EXTRACT_OPTION_INDEX = /^.*-/g;
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
export class MultiSelectComponent
  implements OnInit, OnChanges, ControlValueAccessor {
  selectAllName: string;
  dropdownClasses: string;
  isOpen = false;
  displayValue: string;
  hasAllSelected: boolean;
  onChange: Function;
  onTouched: Function;
  ngControl: NgControl;
  optionsSelected: any[];
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  value: SelectOptionValue[];
  @Input()
  options: SelectOption[];
  @Input()
  listClassName: string;
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor(private inj: Injector) {}

  ngOnInit() {
    this.ngControl = this.inj.get(NgControl);
    const value = this.ngControl.value;
    console.log(this.ngControl);
    this.selectAllName = `${this.id}--selectAll`;
    this.dropdownClasses = this.getDropdownClasses();
    this.displayValue = this.getDisplayValue(value);
    this.hasAllSelected = this.checkIfAllSelected(value);
    this.optionsSelected = this.setOptionsSelected(value);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  writeValue(obj: any): void {
    this.value = obj;
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

  setOptionsSelected(value) {
    console.log('set options', value, this.options);
    return this.options.map((x) => ({
      ...x,
      selected: value && value.includes(x.value)
    }));
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

  handleOptionChange({ name }) {
    const index = Number(name.replace(EXTRACT_OPTION_INDEX, ''));
    const option = this.options.find((x, i) => i === index);
    let valuesSet = new Set([...this.value]);

    if (valuesSet.has(option.value)) {
      valuesSet.delete(option.value);
    } else {
      valuesSet = valuesSet.add(option.value);
    }

    const value = Array.from(valuesSet.values());
    this.onChange(value);

    this.displayValue = this.getDisplayValue(value);
    this.hasAllSelected = this.checkIfAllSelected(value);
    this.optionsSelected = this.setOptionsSelected(value);
  }

  handleSelectAll({ value }) {
    const newValues = value ? this.options.map((op) => op.value) : [];

    this.onChange(value);
    this.displayValue = this.getDisplayValue(newValues);
    this.hasAllSelected = this.checkIfAllSelected(newValues);
    this.optionsSelected = this.setOptionsSelected(newValues);
  }
}
