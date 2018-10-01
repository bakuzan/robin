import { Component, OnInit, Input } from '@angular/core';
import classNames from 'classnames';

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
  @Input()
  id: string;
  @Input()
  listClassName: string;

  constructor() {}

  ngOnInit() {
    this.selectAllName = `${this.id}--selectAll`;
    this.dropdownClasses = this.getDropdownClasses();
  }

  getDropdownClasses(): string {
    return classNames('multi-select__dropdown-container', this.listClassName);
  }

  getName(i) {
    return `${this.id}--${OPTION_PREFIX}${i}`;
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
    if (hasValue) {
      valuesSet.delete(option.value);
      this.$emit('update', [...valuesSet.values()], this.name);
    } else {
      valuesSet.add(option.value);
      this.$emit('update', [...valuesSet.values()], this.name);
    }
  }

  handleSelectAll() {
    const values = new Set([...this.values]);
    const options = new Set([...this.options.map((op) => op.value)]);
    const hasAllSelected = values.size === options.size;
    const newValues = hasAllSelected ? [] : [...options.values()];
    this.$emit('update', newValues, this.name);
  }
}
