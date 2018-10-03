import { Component, OnInit, Input } from '@angular/core';
import classNames from 'classnames';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {
  linkClasses: string;
  @Input()
  to: string;
  @Input()
  class: string;

  constructor() {}

  ngOnInit() {
    this.linkClasses = classNames('nav-link', this.class);
  }
}
