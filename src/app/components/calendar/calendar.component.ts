import classNames from 'classnames';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { Icons } from 'src/app/common/constants';
import Strings from 'src/app/common/constants/strings';
import { generateUniqueId, getFirstDateOfMonth } from 'src/app/common/utils';
import {
  displayMonthAndYear,
  displayYearOnly,
  adjustDateDay,
  adjustDateMonth,
  adjustDateYear,
  formatDateForInput,
  getDaysForDate,
  getMonthsForDate,
  dateIsOutOfRange,
  checkIfSelectedForView,
  addDateSuffix,
  startOfDay,
  checkIfDatePartsMatch
} from 'src/app/common/utils/calendar';
import {
  ICalendarViewOption,
  ICalendarDisplayViewOption,
  ViewOptionEnum
} from 'src/app/common/models/calendar-view-option.model';
import keyCodes, {
  OPEN_KEYS,
  ARROW_KEYS
} from 'src/app/common/constants/key-codes';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  private timer: number = null;
  private blockOutsideClickHack = false;
  prevIcon = Icons.left;
  nextIcon = Icons.right;
  isMonthView = true;
  viewDate: string;
  focusDate: string;
  prevLabel: string;
  nextLabel: string;
  viewOptions: ICalendarDisplayViewOption[] = [];
  viewHeaders = [
    ...Strings.dayNames.slice(1),
    ...Strings.dayNames.slice(0, 1)
  ].map((str) => str.slice(0, 3));
  calendarClasses: string;
  @ViewChild('container', { static: false })
  container: ElementRef;
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
  selectDate = new EventEmitter<string>();
  @Output()
  closeCalendar = new EventEmitter<Event>();

  constructor() {}

  ngOnInit() {
    const date = formatDateForInput(this.selected || new Date());

    this.viewDate = date;
    this.focusDate = date;
    this.setViewDerivedState(this.isMonthView);
    this.calendarClasses = classNames('calendar', this.className);
  }

  ngOnDestroy() {
    requestAnimationFrame(() => {
      const btn = document.getElementById(`${this.id}-calendarButton`);

      if (btn) {
        btn.focus();
      }
    });
  }

  get viewModeText() {
    return this.isMonthView
      ? displayMonthAndYear(this.viewDate)
      : displayYearOnly(this.viewDate);
  }

  get lastOptionId() {
    const op = this.viewOptions.find((x) => x.tabIndex === 0);
    return op ? `option-${op.option.text || op.key}` : `${this.id}-next`;
  }

  toggleViewMode() {
    if (this.disabled) {
      return;
    }

    const mode = !this.isMonthView;
    const matches = checkIfDatePartsMatch(this.viewDate, this.selected);

    this.setViewDerivedState(mode);
    this.isMonthView = mode;
    this.focusDate = formatDateForInput(
      new Date(matches.year && matches.month ? this.selected : this.viewDate)
    );
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
    this.focusDate = viewDate;
    this.setViewDerivedState(isMonthView);
  }

  handleViewOptionKeydown(
    event: KeyboardEvent,
    data: ICalendarDisplayViewOption
  ) {
    if (OPEN_KEYS.includes(event.key)) {
      event.preventDefault();
      this.handleViewOptionSelect(data);
    }
  }

  handleViewOptionSelect(data: ICalendarDisplayViewOption) {
    const option = data.option;

    if (this.disabled || data.disableDate) {
      return;
    }

    const oldViewStr = this.viewDate;
    const oldViewDate = new Date(oldViewStr);

    if (option.optionType === ViewOptionEnum.DAY) {
      const viewDate = formatDateForInput(
        new Date(
          oldViewDate.getFullYear(),
          oldViewDate.getMonth(),
          Number(option.text)
        )
      );

      this.viewDate = viewDate;
      this.selectDate.emit(viewDate);
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex(
        (x: string) => x === option.text
      );
      const viewDate = formatDateForInput(
        new Date(oldViewDate.getFullYear(), monthIndex, 1)
      );
      const matches = checkIfDatePartsMatch(viewDate, this.selected);

      this.blockOutsideClickHack = true;
      this.isMonthView = true;

      this.viewDate = viewDate;
      this.focusDate = formatDateForInput(
        new Date(matches.year && matches.month ? this.selected : viewDate)
      );

      this.setViewDerivedState(true);
      this.setFocus();
    }
  }

  handleOutsideClick(e: Event) {
    if (this.blockOutsideClickHack) {
      this.blockOutsideClickHack = false;
      return;
    }

    this.closeCalendar.emit(e);
  }

  handleCalendarNavigation(event: KeyboardEvent) {
    const { key } = event;
    const currViewDate = new Date(this.viewDate);
    const currFocusDate = new Date(this.focusDate);
    let newDate = null;

    if (ARROW_KEYS.includes(key)) {
      event.preventDefault();
    }

    switch (key) {
      case keyCodes.up:
        newDate = this.isMonthView
          ? adjustDateDay(currFocusDate, -7)
          : adjustDateMonth(currFocusDate, -3);
        break;
      case keyCodes.down:
        newDate = this.isMonthView
          ? adjustDateDay(currFocusDate, 7)
          : adjustDateMonth(currFocusDate, 3);
        break;
      case keyCodes.left:
        newDate = this.isMonthView
          ? adjustDateDay(currFocusDate, -1)
          : adjustDateMonth(currFocusDate, -1);
        break;
      case keyCodes.right:
        newDate = this.isMonthView
          ? adjustDateDay(currFocusDate, 1)
          : adjustDateMonth(currFocusDate, 1);
        break;
      default:
        break;
    }

    if (!newDate) {
      return;
    }

    this.viewDate = formatDateForInput(getFirstDateOfMonth(newDate));
    this.focusDate = formatDateForInput(new Date(newDate));

    const matches = checkIfDatePartsMatch(currViewDate, this.viewDate);
    if (!matches.year || !matches.month) {
      this.setViewDerivedState(this.isMonthView);
    }

    this.setFocus();
  }

  private setViewDerivedState(isMonthView: boolean) {
    this.prevLabel = `Move to previous ${isMonthView ? 'month' : 'year'}`;
    this.nextLabel = `Move to next ${isMonthView ? 'month' : 'year'}`;
    this.viewOptions = this.getViewOptions(isMonthView, this.viewDate);
  }

  private getViewOptions(
    isMonthView: boolean,
    viewDate: string
  ): ICalendarDisplayViewOption[] {
    const opts = isMonthView ? getDaysForDate(viewDate) : getMonthsForDate();

    return opts.map((option) => {
      const key = generateUniqueId();
      const id = `option-${option.text || key}`;
      const isDummyDay = option.optionType === ViewOptionEnum.DUMMY_DAY;
      const isOutOfRange = this.isOutOfRange(isMonthView, viewDate, option);

      const isSelected = this.isViewOptionSelected(viewDate, option);
      const disableDate = isDummyDay || isOutOfRange;
      const title = isOutOfRange ? 'Out of range' : '';
      const tabIndex = this.getTabIndexForOption(option);
      const ariaLabel = isOutOfRange
        ? title
        : option.text
        ? addDateSuffix(isMonthView, viewDate, option.text)
        : null;

      return {
        key,
        id,
        option,
        isSelected,
        isDummyDay,
        isOutOfRange,
        disableDate,
        title,
        ariaLabel,
        tabIndex
      };
    });
  }

  private isViewOptionSelected(viewDate: string, op: ICalendarViewOption) {
    const { selected } = this;
    return checkIfSelectedForView({ selected, viewDate }, op);
  }

  private isOutOfRange(
    isMonthView: boolean,
    viewDate: string,
    op: ICalendarViewOption
  ) {
    const { afterDate, beforeDate } = this;
    return dateIsOutOfRange({ isMonthView, viewDate }, op, {
      afterDate,
      beforeDate
    });
  }

  private getTabIndexForOption(option: ICalendarViewOption) {
    const viewDate = startOfDay(this.viewDate);
    const focusDate = startOfDay(this.focusDate);
    let optionDate = null;

    if (option.optionType === ViewOptionEnum.DAY) {
      optionDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        Number(option.text)
      );
    } else if (option.optionType === ViewOptionEnum.MONTH) {
      const monthIndex = Strings.monthNames.findIndex((x) => x === option.text);

      optionDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    }

    if (focusDate === null || optionDate === null) {
      return -1;
    }

    if (this.isMonthView) {
      return focusDate.getTime() === optionDate.getTime() ? 0 : -1;
    } else {
      return focusDate.getMonth() === optionDate.getMonth() ? 0 : -1;
    }
  }

  private setFocus() {
    requestAnimationFrame(() => {
      const container = this.container.nativeElement;
      const focusDate = new Date(this.focusDate);

      const dx = this.isMonthView
        ? focusDate.getDate()
        : Strings.monthNames[focusDate.getMonth()];

      const target = container.querySelector(`[data-date='${dx}']`);

      if (target) {
        target.focus();
      }
    });
  }
}
