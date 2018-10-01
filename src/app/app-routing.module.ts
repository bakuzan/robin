import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { Urls } from 'src/app/common/constants';

const routes: Routes = [
  { path: '', redirectTo: Urls.dashboard, pathMatch: 'full' },
  { path: Urls.dashboard, component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
