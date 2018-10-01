import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  search = '';
  addUrl = 'create';

  constructor() {}

  ngOnInit() {}

  onInput({ name, value }) {
    console.log('filter bar', name, value);
    this[name] = value;
  }
}
