import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  isActive = false;
  @Input()
  id: string;
  @Input()
  name: string;

  constructor() {}

  ngOnInit() {}

  get tabHash() {
    return this.id
      ? `${this.id}`
      : `${this.name.toLowerCase().replace(/ /g, '-')}`;
  }

  get text() {
    return this.name;
  }
}
