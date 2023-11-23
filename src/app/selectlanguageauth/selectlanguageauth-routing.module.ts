import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectlanguageauthPage } from './selectlanguageauth.page';

const routes: Routes = [
  {
    path: '',
    component: SelectlanguageauthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectlanguageauthPageRoutingModule {}
