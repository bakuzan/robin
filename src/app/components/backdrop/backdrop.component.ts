import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { generateUniqueId, createListeners } from 'src/app/common/utils';
import { CLOSE_KEYS } from 'src/app/common/constants/key-codes';
import Listeners from 'src/app/common/utils/listeners.model';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit, OnDestroy {
  private listeners: Listeners;
  backdropId: string;
  @Input()
  id: string = generateUniqueId();
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.backdropId = `${this.id}__backdrop`;
    this.listeners = createListeners('keydown', this.handleClose.bind(this))();
    this.listeners.listen();
  }

  ngOnDestroy() {
    this.listeners.remove();
  }

  handleClose(event: Event) {
    if (event.type === 'click') {
      return this.close.emit(event);
    }

    const { key } = event as KeyboardEvent;
    if (CLOSE_KEYS.includes(key)) {
      return this.close.emit(event);
    }
  }
}
