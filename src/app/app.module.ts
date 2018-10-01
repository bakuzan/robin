import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoComponent } from './logo/logo.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavLinkComponent } from './nav-link/nav-link.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LogoComponent,
    DashboardComponent,
    NavLinkComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
