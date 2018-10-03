import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../components/components.module';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesCreateComponent } from './series-create/series-create.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@NgModule({
  imports: [CommonModule, ComponentsModule],
  declarations: [
    SeriesListComponent,
    SeriesCreateComponent,
    FilterBarComponent
  ],
  exports: [SeriesListComponent, SeriesCreateComponent]
})
export class SeriesModule {}
