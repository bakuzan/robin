import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import classNames from 'classnames';

import { TextPart, Suggestion } from 'src/app/common/models/suggestion.model';
import { KeyCodes } from 'src/app/common/constants';
import { generateUniqueId } from 'src/app/common/utils';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  private timer: number;
  private selectedItem: Suggestion;
  menuClasses: string;
  filter = '';
  activeSuggestion = 0;
  isFocussed: boolean;
  onChange: Function;
  onTouched: Function;
  @Input()
  inputClasses: string;
  @Input()
  menuClass: string;
  @Input()
  label: string;
  @Input()
  name: string;
  @Input()
  options: Suggestion[];

  get suggestions(): Suggestion[] {
    const { options, filter } = this;
    if (!(options && filter)) {
      return [];
    }

    const filterLowerCase = filter.toLowerCase();
    return options.filter(
      (x) => x.name.toLowerCase().indexOf(filterLowerCase) > -1
    );
  }

  get showMenu() {
    const focussedWithFilter = this.isFocussed && this.filter;
    return focussedWithFilter && !this.selectedItem;
  }

  get hasOptions(): boolean {
    return !!this.options.length;
  }

  get hasSuggestions(): boolean {
    return !!(this.suggestions.length && this.showMenu);
  }

  get showNoSuggestionsText(): boolean {
    return this.showMenu && !this.hasSuggestions && this.hasOptions;
  }

  get hasSelection(): boolean {
    return !!this.selectedItem;
  }

  constructor() {}

  ngOnInit() {
    this.menuClasses = classNames(
      'autocomplete__menu',
      'list column one',
      this.menuClass
    );
  }

  writeValue(obj: Suggestion): void {
    this.selectedItem = obj;
    this.filter = this.selectedItem ? this.selectedItem.name : '';
    console.log('WRITE AUTO', obj, this.options);
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

  onInput(value) {
    if (this.selectedItem) {
      this.writeValue(null);
      this.onChange(null);
    }

    if (this.activeSuggestion) {
      this.activeSuggestion = 0;
    }

    this.filter = value;
  }

  onKeyDown(event) {
    const { keyCode } = event;
    if (keyCode === KeyCodes.enter && this.filter) {
      event.preventDefault();
      this.selectActiveSuggestion();
    } else if (keyCode === KeyCodes.down) {
      this.updateActiveSuggestion(1);
    } else if (keyCode === KeyCodes.up) {
      this.updateActiveSuggestion(-1);
    }
  }

  onFocus() {
    clearTimeout(this.timer);
    this.isFocussed = true;
  }

  onBlur() {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      if (!this.timer) {
        return;
      }
      this.isFocussed = false;
    }, 1000);
  }

  onSelectAutocompleteSuggestion(id) {
    let suggestion = this.options.find((x) => x.id === id);
    if (!suggestion) {
      suggestion = { id: generateUniqueId(), name: this.filter };
    }
    this.writeValue(suggestion);
    this.onChange(suggestion);
  }

  selectActiveSuggestion() {
    const item = this.suggestions[this.activeSuggestion];
    console.log('select active', item);
    const id = item ? item.id : null;
    this.onSelectAutocompleteSuggestion(id);
  }

  updateActiveSuggestion(value) {
    console.log('update suggestion', value, this.activeSuggestion);
    const maxIndex = this.suggestions.length - 1;
    let newValue = this.activeSuggestion + value;
    if (newValue > maxIndex) {
      newValue = 0;
    }
    if (newValue < 0) {
      newValue = maxIndex;
    }
    this.activeSuggestion = newValue;
  }

  highlightMatchingText(value = ''): TextPart {
    const match = value.match(new RegExp(this.filter, 'i'));
    if (!match) {
      return { pre: value } as TextPart;
    }

    const length = this.filter ? this.filter.length : 0;
    const breakdown = {
      pre: value.slice(0, match.index),
      highlight: value.slice(match.index, match.index + length),
      post: value.slice(match.index + length)
    };
    return breakdown;
  }
}
