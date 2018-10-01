import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SeriesListComponent } from 'src/app/series-list/series-list.component';
import { SeriesCreateComponent } from 'src/app/series-create/series-create.component';
import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  { path: '', redirectTo: Urls.dashboard, pathMatch: 'full' },
  { path: Urls.dashboard, component: DashboardComponent },
  { path: Urls.seriesList, component: SeriesListComponent },
  { path: Urls.seriesCreate, component: SeriesCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
