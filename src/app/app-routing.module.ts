import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SeriesListComponent } from 'src/app/series/series-list/series-list.component';
import { SeriesCreateComponent } from 'src/app/series/series-create/series-create.component';
import { PurchaseHistoryComponent } from 'src/app/volume/purchase-history/purchase-history.component';
import { ImporterComponent } from 'src/app/volume/importer/importer.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  { path: '', redirectTo: Urls.dashboard, pathMatch: 'full' },
  { path: Urls.dashboard, component: DashboardComponent },
  { path: Urls.seriesList, component: SeriesListComponent },
  {
    path: Urls.seriesCreate,
    component: SeriesCreateComponent,
    data: { isCreate: true }
  },
  {
    path: Urls.seriesView,
    component: SeriesCreateComponent,
    data: { isCreate: false }
  },
  {
    path: Urls.purchaseHistory,
    component: PurchaseHistoryComponent,
    pathMatch: 'full'
  },
  {
    path: Urls.importer,
    component: ImporterComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
