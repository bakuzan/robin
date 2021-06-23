import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import addOutsideClick from '../common/utils/add-outside-click';

@Directive({
  selector: '[appOutsideClick]'
})
export class OutsideClickDirective implements OnInit, OnDestroy {
  @Output()
  appOutsideClick = new EventEmitter<Event>();

  private removeOutsideClick = null;
  private blockCloseUntilLoaded = true;
  private timer: number = null;

  constructor(private el: ElementRef) {
    this.handleOutside = this.handleOutside.bind(this);
  }

  ngOnInit() {
    const node = this.el.nativeElement;
    this.removeOutsideClick = addOutsideClick(node, this.handleOutside);
    this.unblockClose();
  }

  ngOnDestroy(): void {
    if (this.removeOutsideClick) {
      this.removeOutsideClick();
    }
  }

  handleOutside(e: Event) {
    if (this.blockCloseUntilLoaded) {
      return;
    }

    this.appOutsideClick.emit(e);
  }

  private unblockClose() {
    clearTimeout(this.timer);
    this.timer = window.setTimeout(
      () => (this.blockCloseUntilLoaded = false),
      250
    );
  }
}
