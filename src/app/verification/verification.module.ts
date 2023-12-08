import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationPageRoutingModule } from './verification-routing.module';

import { VerificationPage } from './verification.page';
import { MainPipeModule } from '../pipes/main-pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskIonicModule } from 'ngx-mask-ionic';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationPageRoutingModule,
    MainPipeModule,
    TranslateModule,
    NgxMaskIonicModule
  ],
  declarations: [VerificationPage]
})
export class VerificationPageModule { }
