import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdittransportPageRoutingModule } from './edittransport-routing.module';

import { EdittransportPage } from './edittransport.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EdittransportPageRoutingModule,
        TranslateModule
    ],
  declarations: [EdittransportPage]
})
export class EdittransportPageModule {}
