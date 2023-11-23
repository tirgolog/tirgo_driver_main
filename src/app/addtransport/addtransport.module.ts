import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtransportPageRoutingModule } from './addtransport-routing.module';

import { AddtransportPage } from './addtransport.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddtransportPageRoutingModule,
        TranslateModule
    ],
  declarations: [AddtransportPage]
})
export class AddtransportPageModule {}
