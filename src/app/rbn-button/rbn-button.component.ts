import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    console.log(this);
  }

  classes() {
    return classNames({
      button: true,
      'themed-background': this.theme !== 'default',
      'themed-background--reversed': this.theme === 'secondary',
      'button--icon': !!this.icon,
      [`button--size_${this.size}`]: !!this.size,
      'button--rounded': this.rounded,
      'button--depress': this.depress,
      ripple: true
    });
  }

  onClick() {
    console.log('unhandled click');
  }
}
