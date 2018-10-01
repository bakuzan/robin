import { Component, OnInit, OnDestroy } from '@angular/core';

import Listeners from 'src/app/common/utils/listeners.model';
import { createListeners, getWindowScrollPosition } from 'src/app/common/utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollListeners: Listeners;
  windowScrollPosition = 0;

  constructor() {}

  ngOnInit() {
    this.scrollListeners = createListeners('scroll', () => {
      const windowScrollPosition = getWindowScrollPosition();
      if (windowScrollPosition !== this.windowScrollPosition) {
        this.windowScrollPosition = windowScrollPosition;
      }
    })();
    this.scrollListeners.listen();
  }

  ngOnDestroy() {
    this.scrollListeners.remove();
  }
}
