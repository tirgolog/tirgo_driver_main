import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NamePageRoutingModule } from './name-routing.module';

import { NamePage } from './name.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NamePageRoutingModule,
        TranslateModule
    ],
  declarations: [NamePage]
})
export class NamePageModule {}
