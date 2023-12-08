import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loading',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'selectlanguage',
    loadChildren: () => import('./selectlanguage/selectlanguage.module').then( m => m.SelectlanguagePageModule)
  },
  {
    path: 'recoverlogin',
    loadChildren: () => import('./auth/recoverlogin/recoverlogin.module').then( m => m.RecoverloginPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then( m => m.BalancePageModule)
  },
  {
    path: 'mysubscribers',
    loadChildren: () => import('./mysubscribers/mysubscribers.module').then( m => m.MysubscribersPageModule)
  },
  {
    path: 'notify', children:
      [
        {
          path: '',
          loadChildren: () => import('./notify/notify.module').then( m => m.NotifyPageModule)
        },
        {
          path: 'notifyview/:id',
          loadChildren: () => import('./notifyview/notifyview.module').then( m => m.NotifyviewPageModule)
        },
      ]
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'name',
    loadChildren: () => import('./auth/name/name.module').then( m => m.NamePageModule)
  },
  {
    path: 'addtransport',
    loadChildren: () => import('./addtransport/addtransport.module').then( m => m.AddtransportPageModule)
  },
  {
    path: 'edittransport',
    loadChildren: () => import('./edittransport/edittransport.module').then( m => m.EdittransportPageModule)
  },
  {
    path: 'nointernet',
    loadChildren: () => import('./nointernet/nointernet.module').then( m => m.NointernetPageModule)
  },
  {
    path: 'selectlanguageauth',
    loadChildren: () => import('./selectlanguageauth/selectlanguageauth.module').then( m => m.SelectlanguageauthPageModule)
  },  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
