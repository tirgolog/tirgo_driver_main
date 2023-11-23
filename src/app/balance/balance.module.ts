import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancePageRoutingModule } from './balance-routing.module';

import { BalancePage } from './balance.page';
import {HeaderPageModule} from "../header/header.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BalancePageRoutingModule,
        HeaderPageModule,
        TranslateModule
    ],
  declarations: [BalancePage]
})
export class BalancePageModule {}
