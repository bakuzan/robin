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
    SelectBoxComponent
  ],
  exports: [
    LogoComponent,
    NavLinkComponent,
    InputBoxComponent,
    RbnButtonComponent,
    MultiSelectComponent,
    TickboxComponent,
    BackdropComponent,
    SelectBoxComponent
  ]
})
export class ComponentsModule {}
