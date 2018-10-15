import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PurchaseHistoryComponent],
  exports: [PurchaseHistoryComponent]
})
export class VolumeModule {}
