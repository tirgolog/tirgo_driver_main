import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {HeaderPageModule} from "../header/header.module";
import {NgxMaskIonicModule} from "ngx-mask-ionic";
import {MainPipeModule} from "../pipes/main-pipe.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        HeaderPageModule,
        NgxMaskIonicModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
