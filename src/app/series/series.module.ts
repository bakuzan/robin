import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesCreateComponent } from './series-create/series-create.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SeriesListComponent, SeriesCreateComponent, FilterBarComponent]
})
export class SeriesModule {}
