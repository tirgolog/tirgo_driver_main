import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'activeorder', children:
          [{
            path: '',
            loadChildren: () => import('../activeorder/activeorder.module').then(m => m.ActiveorderPageModule)
          }]
      },
      {
        path: 'home', children:
          [{
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }]
      },
      {
        path: 'archive', children:
          [{
            path: '',
            loadChildren: () => import('../archive/archive.module').then( m => m.ArchivePageModule)
          }]
      },
      {
        path: 'profile', children:
          [{
            path: '',
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
          }]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
