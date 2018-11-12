import { Component, OnInit } from '@angular/core';

import { Icons, Strings } from 'src/app/common/constants';
import { StorageService } from 'src/app/common/storage.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {
  theme = this.store.get('theme');
  id = 'app-settings';
  alignment = Strings.right;
  title = 'App Settings';
  icon = Icons.settings;
  appThemes = [
    { value: 'none', text: 'No theme' },
    { value: 'one', text: 'Sabaody (TS)' },
    { value: 'two', text: 'Whiskey peak' },
    { value: 'three', text: 'Enies Lobby' }
  ];

  constructor(private store: StorageService) {}

  ngOnInit() {
    this.setTheme();
  }

  get themeName() {
    return `theme theme--${this.theme}`;
  }

  setTheme() {
    document.body.className = this.themeName;
  }

  onChange(theme) {
    this.theme = this.store.save('theme', theme);
    this.setTheme();
  }
}
