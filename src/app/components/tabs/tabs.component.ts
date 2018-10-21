import {
  Component,
  OnInit,
  ContentChildren,
  AfterContentInit,
  QueryList
} from '@angular/core';
import { TabComponent as Tab } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {
  @ContentChildren(Tab)
  tabs: QueryList<Tab>;

  constructor() {}

  ngOnInit() {}

  ngAfterContentInit() {
    window.addEventListener('hashchange', () =>
      this.selectTab(window.location.hash)
    );

    const tab = this.findTab(window.location.hash);
    if (tab) {
      this.selectTab(window.location.hash);
      return;
    }
    console.log('init tabs', this.tabs);
    this.selectTab(this.tabs.first.tabHash);
  }

  findTab(hash: string) {
    return this.tabs.find((tab) => tab.tabHash === hash);
  }

  selectTab(hash: string) {
    const tab = this.findTab(hash);
    if (!tab) {
      return;
    }

    this.tabs.forEach((t) => (t.isActive = t.tabHash === tab.tabHash));
  }
}
