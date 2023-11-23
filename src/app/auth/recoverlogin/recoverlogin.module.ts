import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoverloginPageRoutingModule } from './recoverlogin-routing.module';

import { RecoverloginPage } from './recoverlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverloginPageRoutingModule
  ],
  declarations: [RecoverloginPage]
})
export class RecoverloginPageModule {}
