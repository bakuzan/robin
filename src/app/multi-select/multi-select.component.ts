import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

import MultiSelectOption, {
  MultiSelectOptionValue
} from 'src/app/common/models/multi-select-option.model';
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
  values: MultiSelectOptionValue[];
  @Input()
  options: MultiSelectOption[];
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

  getDisplayValue(): string {
    const length = this.values.length;
    if (!length) {
      return '';
    } else if (length === this.options.length) {
      return ALL_SELECTED_TEXT;
    } else if (length === 1) {
      return this.options.find((x) => this.values.includes(x.value)).text;
    }
    return `${length} selected`;
  }

  checkIfAllSelected(): boolean {
    return this.values.length === this.options.length;
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

  handleOptionChange(_, name) {
    const index = Number(name.replace(EXTRACT_OPTION_INDEX, ''));
    const option = this.options.find((x, i) => i === index);
    const valuesSet = new Set([...this.values]);
    const hasValue = valuesSet.has(option.value);
    const value = Array.from(valuesSet.values());

    if (hasValue) {
      valuesSet.delete(option.value);
      this.update.emit({ value, name: this.name });
    } else {
      valuesSet.add(option.value);
      this.update.emit({ value, name: this.name });
    }

    this.displayValue = this.getDisplayValue();
    this.hasAllSelected = this.checkIfAllSelected();
  }

  handleSelectAll() {
    const values = new Set([...this.values]);
    const options = new Set([...this.options.map((op) => op.value)]);
    const hasAllSelected = values.size === options.size;
    const newValues = hasAllSelected ? [] : Array.from(options.values());

    this.update.emit({ value: newValues, name: this.name });
    this.displayValue = this.getDisplayValue();
    this.hasAllSelected = this.checkIfAllSelected();
  }
}
