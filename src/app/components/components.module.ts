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
    AutocompleteSuggestionComponent
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
    AutocompleteComponent
  ]
})
export class ComponentsModule {}
