import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectlanguagePage } from './selectlanguage.page';

const routes: Routes = [
  {
    path: '',
    component: SelectlanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectlanguagePageRoutingModule {}
