import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtransportPage } from './addtransport.page';

const routes: Routes = [
  {
    path: '',
    component: AddtransportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtransportPageRoutingModule {}
