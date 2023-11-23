import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifyviewPageRoutingModule } from './notifyview-routing.module';

import { NotifyviewPage } from './notifyview.page';
import {MainPipeModule} from "../pipes/main-pipe.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NotifyviewPageRoutingModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [NotifyviewPage]
})
export class NotifyviewPageModule {}
