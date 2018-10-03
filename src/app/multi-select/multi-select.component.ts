import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

import SelectOption, {
  SelectOptionValue
} from '../common/models/select-option.model';
import { Strings, OPEN_KEYS } from 'src/app/common/constants';

const EXTRACT_OPTION_INDEX = /^.*-/g;
const OPTION_PREFIX = 'option-';
const ALL_SELECTED_TEXT = 'All Selected';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  selectAllName: string;
  dropdownClasses: string;
  isOpen = false;
  displayValue: string;
  hasAllSelected: boolean;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  values: SelectOptionValue[];
  @Input()
  options: SelectOption[];
  @Input()
  listClassName: string;
  @Output()
  update: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.selectAllName = `${this.id}--selectAll`;
    this.dropdownClasses = this.getDropdownClasses();
    this.displayValue = this.getDisplayValue();
    this.hasAllSelected = this.checkIfAllSelected();
  }

  getDropdownClasses(): string {
    return classNames('multi-select__dropdown-container', this.listClassName);
  }

  getName(i) {
    return `${this.id}--${OPTION_PREFIX}${i}`;
  }

  getDisplayValue(values = this.values): string {
    const length = values.length;
    if (!length) {
      return '';
    } else if (length === this.options.length) {
      return ALL_SELECTED_TEXT;
    } else if (length === 1) {
      return this.options.find((x) => values.includes(x.value)).text;
    }
    return `${length} selected`;
  }

  checkIfAllSelected(values = this.values): boolean {
    return values.length === this.options.length;
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
    let valuesSet = new Set([...this.values]);

    if (valuesSet.has(option.value)) {
      valuesSet.delete(option.value);
    } else {
      valuesSet = valuesSet.add(option.value);
    }

    const value = Array.from(valuesSet.values());
    this.update.emit({
      value,
      name: this.name
    });

    this.displayValue = this.getDisplayValue(value);
    this.hasAllSelected = this.checkIfAllSelected(value);
  }

  handleSelectAll({ value }) {
    const newValues = value ? this.options.map((op) => op.value) : [];

    this.update.emit({ value: newValues, name: this.name });
    this.displayValue = this.getDisplayValue(newValues);
    this.hasAllSelected = this.checkIfAllSelected(newValues);
  }
}
