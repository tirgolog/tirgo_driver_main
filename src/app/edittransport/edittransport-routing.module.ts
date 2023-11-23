import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdittransportPage } from './edittransport.page';

const routes: Routes = [
  {
    path: '',
    component: EdittransportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdittransportPageRoutingModule {}
