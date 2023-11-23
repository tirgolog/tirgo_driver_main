import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverloginPage } from './recoverlogin.page';

const routes: Routes = [
  {
    path: '',
    component: RecoverloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoverloginPageRoutingModule {}
