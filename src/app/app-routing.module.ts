import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  { path: '', redirectTo: Urls.dashboard, pathMatch: 'full' },
  { path: Urls.dashboard, component: DashboardComponent },
  {
    path: Urls.seriesList,
    loadChildren: () =>
      import('./series/series-routing.module').then(
        (m) => m.SeriesRoutingModule
      )
  },
  {
    path: Urls.purchaseHistory,
    loadChildren: () =>
      import('./volume/volume-routing.module').then(
        (m) => m.VolumeRoutingModule
      )
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
