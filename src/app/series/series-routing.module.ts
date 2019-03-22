import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesListComponent } from 'src/app/series/series-list/series-list.component';
import { SeriesCreateComponent } from 'src/app/series/series-create/series-create.component';
// import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
// import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  { path: '', component: SeriesListComponent, pathMatch: 'full' },
  {
    path: 'create',
    component: SeriesCreateComponent,
    data: { isCreate: true }
  },
  {
    path: 'view/:id',
    component: SeriesCreateComponent,
    data: { isCreate: false }
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeriesRoutingModule {}
