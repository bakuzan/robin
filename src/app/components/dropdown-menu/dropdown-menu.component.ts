import classNames from 'classnames';
import { Component, OnInit, Input } from '@angular/core';

import { Strings } from 'src/app/common/constants';
import ElementCoordinates from 'src/app/common/utils/element-coordinates.model';
import { getElementCoordinates } from 'src/app/common/utils';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {
  position: ElementCoordinates;
  isDropdownOpen = false;
  @Input()
  id: string;
  @Input()
  name: string;
  @Input()
  icon: string;
  @Input()
  title: string;
  @Input()
  ignorePosition: boolean;
  @Input()
  className: string;
  @Input()
  align: string;
  @Input()
  waiAriaLabel?: string;

  constructor() {}

  ngOnInit() {}

  get togglerId(): string {
    return `${this.id}__toggler`;
  }

  get menuId(): string {
    return `${this.id}__menu`;
  }

  get menuStyle() {
    if (this.ignorePosition || !this.position) {
      return {};
    }

    const { top, left, right } = this.position;
    return this.align === Strings.left
      ? { top: `${top}px`, left: `${left}px` }
      : this.align === Strings.right
      ? { top: `${top}px`, right: `${right}px` }
      : { top: `${top}px` };
  }

  get dropdownMenuClasses(): string {
    return classNames(
      'dropdown__menu',
      `dropdown__menu--align_${this.align}`,
      this.className
    );
  }

  toggleDropdown(event: Event) {
    const position = getElementCoordinates(event.target);
    this.position = position;
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
