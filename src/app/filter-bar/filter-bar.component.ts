import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  search = '';

  constructor() {}

  ngOnInit() {}

  onInput({ name, value }) {
    console.log(name, value);
    this[name] = value;
  }
}
