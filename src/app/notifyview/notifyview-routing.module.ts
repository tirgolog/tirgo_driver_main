import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifyviewPage } from './notifyview.page';

const routes: Routes = [
  {
    path: '',
    component: NotifyviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifyviewPageRoutingModule {}
