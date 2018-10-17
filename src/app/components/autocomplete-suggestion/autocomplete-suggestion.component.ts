import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { TextPart, Suggestion } from 'src/app/common/models/suggestion.model';

@Component({
  selector: 'app-autocomplete-suggestion',
  templateUrl: './autocomplete-suggestion.component.html',
  styleUrls: ['./autocomplete-suggestion.component.scss']
})
export class AutocompleteSuggestionComponent implements OnInit, OnChanges {
  isActiveSuggestion: boolean;
  textPart: TextPart;
  @Input()
  activeSuggestion: number;
  @Input()
  index: number;
  @Input()
  item: Suggestion;
  @Input()
  highlightMatch: Function;
  @Output()
  select: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    // this.isActiveSuggestion = this.activeSuggestion === this.index;
    // this.textPart = this.highlightMatch(this.item.name);
  }

  onClick() {
    this.select.emit(this.item.id);
  }
}
