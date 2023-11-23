import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectlanguageauthPageRoutingModule } from './selectlanguageauth-routing.module';

import { SelectlanguageauthPage } from './selectlanguageauth.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectlanguageauthPageRoutingModule,
        TranslateModule
    ],
  declarations: [SelectlanguageauthPage]
})
export class SelectlanguageauthPageModule {}
