import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { LogoComponent } from './logo/logo.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { RbnButtonComponent } from './rbn-button/rbn-button.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { TickboxComponent } from './tickbox/tickbox.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { SelectBoxComponent } from './select-box/select-box.component';
import { ListComponent } from './list/list.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './radio-button-group/radio-button-group.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteSuggestionComponent } from './autocomplete-suggestion/autocomplete-suggestion.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { AggregateWidgetComponent } from './aggregate-widget/aggregate-widget.component';
import { LoadingBouncerComponent } from './loading-bouncer/loading-bouncer.component';
import { AlertComponent } from './alert/alert.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  imports: [AppRoutingModule, CommonModule, FormsModule],
  declarations: [
    LogoComponent,
    NavLinkComponent,
    InputBoxComponent,
    RbnButtonComponent,
    MultiSelectComponent,
    TickboxComponent,
    BackdropComponent,
    SelectBoxComponent,
    ListComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    AutocompleteComponent,
    AutocompleteSuggestionComponent,
    TabsComponent,
    TabComponent,
    AggregateWidgetComponent,
    LoadingBouncerComponent,
    AlertComponent,
    DropdownMenuComponent,
    AppSettingsComponent,
    DatepickerComponent,
    CalendarComponent
  ],
  exports: [
    LogoComponent,
    NavLinkComponent,
    InputBoxComponent,
    RbnButtonComponent,
    MultiSelectComponent,
    TickboxComponent,
    BackdropComponent,
    SelectBoxComponent,
    ListComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    AutocompleteComponent,
    TabsComponent,
    TabComponent,
    AggregateWidgetComponent,
    LoadingBouncerComponent,
    AlertComponent,
    AppSettingsComponent,
    DatepickerComponent,
    CalendarComponent
  ]
})
export class ComponentsModule {}
