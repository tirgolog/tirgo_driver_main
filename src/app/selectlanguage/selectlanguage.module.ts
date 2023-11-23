import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectlanguagePageRoutingModule } from './selectlanguage-routing.module';

import { SelectlanguagePage } from './selectlanguage.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectlanguagePageRoutingModule,
        TranslateModule
    ],
  declarations: [SelectlanguagePage]
})
export class SelectlanguagePageModule {}
