import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-tickbox',
  templateUrl: './tickbox.component.html',
  styleUrls: ['./tickbox.component.scss']
})
export class TickboxComponent implements OnInit {
  tickboxClasses: string;
  @Input()
  name: string;
  @Input()
  checked: boolean;
  @Input()
  disabled: boolean;
  @Input()
  customTickbox: string;
  @Output()
  toggle: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.tickboxClasses = this.getTickboxClasses();
  }

  getTickboxClasses(): string {
    return classNames('tickbox', this.customTickbox);
  }

  onChange(event) {
    const value = event.target.checked;
    console.log(
      '%c TICKBOX CHANGED',
      'color: firebrick',
      value,
      this.name,
      event
    );
    this.toggle.emit({ value, name: this.name, event });
  }
}
