import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-rbn-button',
  templateUrl: './rbn-button.component.html',
  styleUrls: ['./rbn-button.component.scss']
})
export class RbnButtonComponent implements OnInit {
  @Input()
  grow: boolean;
  @Input()
  type = 'button';
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
  @Input()
  class: string;
  @Input()
  id?: string;
  @Input()
  name?: string;
  @Input()
  waiAriaLabel: string;

  constructor() {}

  ngOnInit() {}

  get classes(): string {
    const size = this.size || (this.icon && 'small');

    return classNames(
      {
        button: true,
        'button--themed': this.theme !== 'default',
        'button--themed_reversed': this.theme === 'secondary',
        'button--icon': !!this.icon,
        [`button--size_${size}`]: !!this.size || !!this.icon,
        'button--rounded': this.rounded,
        'button--depress': this.depress,
        ripple: true,
        'button--grow': this.grow
      },
      this.class
    );
  }
}
