import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MysubscribersPageRoutingModule } from './mysubscribers-routing.module';

import { MysubscribersPage } from './mysubscribers.page';
import {HeaderPageModule} from "../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MysubscribersPageRoutingModule,
        HeaderPageModule
    ],
  declarations: [MysubscribersPage]
})
export class MysubscribersPageModule {}
