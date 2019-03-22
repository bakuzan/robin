import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseHistoryComponent } from 'src/app/volume/purchase-history/purchase-history.component';
import { ImporterComponent } from 'src/app/volume/importer/importer.component';
// import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
// import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  {
    path: '',
    component: PurchaseHistoryComponent,
    pathMatch: 'full'
  },
  {
    path: 'export-import',
    component: ImporterComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolumeRoutingModule {}
