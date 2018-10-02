import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoComponent } from './logo/logo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavLinkComponent } from './nav-link/nav-link.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesCreateComponent } from './series-create/series-create.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { RbnButtonComponent } from './rbn-button/rbn-button.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { TickboxComponent } from './tickbox/tickbox.component';
import { BackdropComponent } from './backdrop/backdrop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LogoComponent,
    DashboardComponent,
    NavLinkComponent,
    SeriesListComponent,
    FilterBarComponent,
    InputBoxComponent,
    RbnButtonComponent,
    SeriesCreateComponent,
    MultiSelectComponent,
    TickboxComponent,
    BackdropComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
