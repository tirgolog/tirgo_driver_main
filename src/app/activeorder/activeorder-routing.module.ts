import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveorderPage } from './activeorder.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveorderPageRoutingModule {}
