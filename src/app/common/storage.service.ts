import { Injectable } from '@angular/core';

import { Strings } from './constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  settingDefaults() {
    return {
      theme: 'one'
    };
  }

  get(key: string, fallback: string = '') {
    const data = this.getSettings();
    return (data && data[key]) || fallback;
  }

  save(key: string, value: any) {
    const values = this.saveSettings({ [key]: value });
    return values[key];
  }

  private saveSettings(newValues) {
    const values = this.getSettings();
    const updated = { ...values, ...newValues };
    localStorage.setItem(Strings.localStorageKey, JSON.stringify(updated));
    return updated;
  }

  // Private
  private getSettings() {
    return (
      JSON.parse(localStorage.getItem(Strings.localStorageKey)) ||
      this.settingDefaults()
    );
  }
}
