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
    loadChildren: './series/series-routing.module#SeriesRoutingModule'
  },
  {
    path: Urls.purchaseHistory,
    loadChildren: './volume/volume-routing.module#VolumeRoutingModule'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
