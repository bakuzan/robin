import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TextPart, Suggestion } from 'src/app/common/models/suggestion.model';

@Component({
  selector: 'app-autocomplete-suggestion',
  templateUrl: './autocomplete-suggestion.component.html',
  styleUrls: ['./autocomplete-suggestion.component.scss']
})
export class AutocompleteSuggestionComponent implements OnInit {
  @Input()
  activeSuggestion: number;
  @Input()
  index: number;
  @Input()
  item: Suggestion;
  @Input()
  textPart: TextPart;
  @Output()
  selectItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  get isActiveSuggestion(): boolean {
    return this.activeSuggestion === this.index;
  }

  onClick() {
    this.selectItem.emit(this.item.id);
  }
}
