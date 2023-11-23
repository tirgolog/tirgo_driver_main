import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActiveorderPageRoutingModule } from './activeorder-routing.module';

import { ActiveorderPage } from './activeorder.page';
import {HeaderPageModule} from "../header/header.module";
import {MainPipeModule} from "../pipes/main-pipe.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ActiveorderPageRoutingModule,
        HeaderPageModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [ActiveorderPage]
})
export class ActiveorderPageModule {}
