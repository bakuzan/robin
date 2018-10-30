import classNames from 'classnames';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bouncer',
  templateUrl: './loading-bouncer.component.html',
  styleUrls: ['./loading-bouncer.component.scss']
})
export class LoadingBouncerComponent implements OnInit {
  classes: string;
  bouncerClasses: string;
  range = [1, 2, 3];
  @Input()
  local: boolean;
  @Input()
  inline: boolean;

  constructor() {}

  ngOnInit() {
    this.classes = classNames('loading-bouncer', {
      'loading-bouncer--inline': this.inline,
      'loading-bouncer--local': this.local && !this.inline,
      'loading-bouncer--fixed': !this.local && !this.inline
    });

    this.bouncerClasses = classNames(
      'loading-bouncer__circle',
      'themed-background'
    );
  }
}
