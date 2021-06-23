import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import classNames from 'classnames';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent implements OnInit {
  @Input()
  to: string;
  @Input()
  queryParams: any;
  @Input()
  class: string;

  linkClasses: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.linkClasses = classNames('nav-link', this.class);
  }

  isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl =
      queryParamsIndex === -1
        ? this.router.url
        : this.router.url.slice(0, queryParamsIndex);

    return baseUrl === `/${url}`;
  }
}
