import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivePageRoutingModule } from './archive-routing.module';

import { ArchivePage } from './archive.page';
import {HeaderPageModule} from "../header/header.module";
import {MainPipeModule} from "../pipes/main-pipe.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ArchivePageRoutingModule,
        HeaderPageModule,
        MainPipeModule,
        TranslateModule
    ],
  declarations: [ArchivePage]
})
export class ArchivePageModule {}
