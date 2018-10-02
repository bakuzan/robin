import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-rbn-button',
  templateUrl: './rbn-button.component.html',
  styleUrls: ['./rbn-button.component.scss']
})
export class RbnButtonComponent implements OnInit {
  @Input()
  type = 'text';
  @Input()
  size: string;
  @Input()
  theme = 'default';
  @Input()
  rounded: boolean;
  @Input()
  depress: boolean;
  @Input()
  disabled: boolean;
  @Input()
  icon: string;
  @Output()
  click: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  classes() {
    const size = this.size || (this.icon && 'small');
    return classNames({
      button: true,
      'themed-background': this.theme !== 'default',
      'themed-background--reversed': this.theme === 'secondary',
      'button--icon': !!this.icon,
      [`button--size_${size}`]: !!this.size || !!this.icon,
      'button--rounded': this.rounded,
      'button--depress': this.depress,
      ripple: true
    });
  }

  onClick(e) {
    this.click.emit(e);
  }
}
