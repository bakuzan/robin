import classNames from 'classnames';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import Strings from 'src/app/common/constants/strings';
import {
  displayMonthAndYear,
  displayYearOnly,
  adjustDateMonth,
  adjustDateYear,
  formatDateForInput,
  getDaysForDate,
  getMonthsForDate,
  dateIsOutOfRange,
  checkIfSelectedForView
} from 'src/app/common/utils/calendar';
import {
  ICalendarViewOption,
  ViewOptionEnum
} from 'src/app/common/models/calendar-view-option.model';
import { Icons } from 'src/app/common/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private timer: number = null;
  prevIcon = Icons.left;
  nextIcon = Icons.right;
  isMonthView = true;
  viewDate: string;
  prevLabel: string;
  nextLabel: string;
  viewOptions: ICalendarViewOption[] = [];
  viewHeaders = [
    ...Strings.dayNames.slice(1),
    ...Strings.dayNames.slice(0, 1)
  ].map((str) => str.slice(0, 3));
  calendarClasses: string;
  @Input()
  id: string;
  @Input()
  className? = '';
  @Input()
  selected: string;
  @Input()
  afterDate: string;
  @Input()
  beforeDate: string;
  @Input()
  disabled? = false;
  @Input()
  isFlat? = false;
  @Output()
  select = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    const date = formatDateForInput(this.selected || new Date());
    this.viewDate = date;
    this.setViewDerivedState(this.isMonthView);
    this.calendarClasses = classNames('calendar', this.className);
  }

  get viewModeText() {
    return this.isMonthView
      ? displayMonthAndYear(this.viewDate)
      : displayYearOnly(this.viewDate);
  }

  // View Helpers START
  isDummyDay(op: ICalendarViewOption) {
    return op.optionType === ViewOptionEnum.DUMMY_DAY;
  }

  isViewOptionSelected(op: ICalendarViewOption) {
    const { viewDate, selected } = this;
    return checkIfSelectedForView({ selected, viewDate }, op);
  }

  isOutOfRange(op: ICalendarViewOption) {
    const { isMonthView, viewDate, afterDate, beforeDate } = this;
    return dateIsOutOfRange({ isMonthView, viewDate }, op, {
      afterDate,
      beforeDate
    });
  }

  getAria(op: ICalendarViewOption) {
    return op.isDummy
      ? ''
      : this.isOutOfRange(op)
      ? 'Out of range'
      : `${op.text} ${this.viewModeText}`;
  }

  // View Helpers END

  toggleViewMode() {
    if (this.disabled) {
      return;
    }

    const mode = !this.isMonthView;
    this.setViewDerivedState(mode);
    this.isMonthView = mode;
  }

  handleViewShift(direction: number) {
    if (this.disabled) {
      return;
    }

    const { isMonthView, viewDate: oldViewDate } = this;
    const viewDate = isMonthView
      ? adjustDateMonth(oldViewDate, direction)
      : adjustDateYear(oldViewDate, direction);

    this.viewDate = viewDate;
    this.setViewDerivedState(isMonthView);
  }

  handleViewOptionSelect(option) {
    if (this.disabled) {
      return;
    }

    const oldViewStr = this.viewDate;
    const oldViewDate = new Date(oldViewStr);

    if (option.optionType === ViewOptionEnum.DAY) {
      const viewDate = formatDateForInput(
        new Date(oldViewDate.getFullYear(), oldViewDate.getMonth(), option.text)
      );

      this.viewDate = viewDate;
      this.select.emit(viewDate);
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex(
        (x: string) => x === option.text
      );
      const viewDate = formatDateForInput(
        new Date(oldViewDate.getFullYear(), monthIndex, 1)
      );

      this.isMonthView = true;
      this.viewDate = viewDate;
      this.setViewDerivedState(true);
      this.setFocus(viewDate);
    }
  }

  private setViewDerivedState(isMonthView: boolean) {
    this.prevLabel = `Move to previous ${isMonthView ? 'year' : 'month'}`;
    this.nextLabel = `Move to next ${isMonthView ? 'year' : 'month'}`;
    this.viewOptions = this.getViewOptions(isMonthView, this.viewDate);
  }

  private getViewOptions(isMonthView: boolean, viewDate: string) {
    return isMonthView ? getDaysForDate(viewDate) : getMonthsForDate();
  }

  // Gross, but apparently necessary to prevent focus "falling off" the calendar
  private setFocus(viewDate: string) {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      let target: HTMLButtonElement = document.querySelector(
        '.calendar-view__option--selected button'
      );

      if (!target) {
        target = document.querySelector(
          `#option-${new Date(viewDate).getDate()} button`
        ) as HTMLButtonElement;
      }

      target.focus();
    }, 100);
  }
}
