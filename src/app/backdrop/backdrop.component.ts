import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { generateUniqueId } from 'src/app/common/utils';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {
  backdropId: string;
  @Input()
  id: string = generateUniqueId();
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.backdropId = `${this.id}__backdrop`;
  }

  handleClose(event) {
    this.close.emit(event);
  }
}
