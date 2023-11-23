import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysubscribersPage } from './mysubscribers.page';

const routes: Routes = [
  {
    path: '',
    component: MysubscribersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MysubscribersPageRoutingModule {}
