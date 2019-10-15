import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-tab-trap',
  templateUrl: './tab-trap.component.html',
  styleUrls: ['./tab-trap.component.scss']
})
export class TabTrapComponent implements OnInit, OnChanges {
  @ViewChild('container', { read: ElementRef, static: false })
  container: ElementRef;
  @Input()
  isActive: boolean;
  @Input()
  firstId: string;
  @Input()
  lastId: string;
  @Output()
  deactivate: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const isActive = changes['isActive'];
    const hasChange = !!isActive;

    if (hasChange) {
      this.onIsActiveChange(isActive);
    }
  }

  onIsActiveChange(chg: SimpleChange) {
    const nowActive = !chg.previousValue && chg.currentValue;
    const wasActive = !chg.currentValue && chg.previousValue;

    if (nowActive) {
      requestAnimationFrame(() => {
        const ref = this.container.nativeElement.parentNode;

        const target = ref.querySelector(`#${this.firstId}`);
        if (target) {
          target.focus();
        }
      });
    } else if (wasActive) {
      this.deactivate.emit();
    }
  }

  focusCycler(e: FocusEvent) {
    const curr = e.target as HTMLElement;
    const prev = e.relatedTarget as HTMLElement;

    const isPrevATrap = prev && prev.className.includes('tab-trap');
    const isCurrTopTrap = curr.className.includes('tab-trap--top');
    const ref = this.container.nativeElement.parentNode;

    if (isPrevATrap) {
      const targetId = isCurrTopTrap ? this.firstId : this.lastId;
      const targetElement = ref.querySelector(`#${targetId}`);
      targetElement.focus();
      return;
    }

    const nextTrapClass = isCurrTopTrap
      ? '.tab-trap--bottom'
      : '.tab-trap--top';

    const nextTrap = ref.querySelector(nextTrapClass);

    if (nextTrap === document.activeElement) {
      const targetElement = ref.querySelector(`#${this.firstId}`);
      targetElement.focus();
      return;
    }

    nextTrap.focus();
  }
}
