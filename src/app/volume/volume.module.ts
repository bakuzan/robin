import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { PurchaseItemComponent } from './purchase-item/purchase-item.component';
import { ImporterComponent } from './importer/importer.component';

@NgModule({
  imports: [CommonModule, FormsModule, ComponentsModule],
  declarations: [
    PurchaseHistoryComponent,
    FilterBarComponent,
    PurchaseItemComponent,
    ImporterComponent
  ],
  exports: [PurchaseHistoryComponent, ImporterComponent]
})
export class VolumeModule {}
