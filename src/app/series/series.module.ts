import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from '../components/components.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesCreateComponent } from './series-create/series-create.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    SeriesListComponent,
    SeriesCreateComponent,
    FilterBarComponent
  ],
  providers: [],
  exports: [SeriesListComponent, SeriesCreateComponent]
})
export class SeriesModule {}
