import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormatTimePipe} from './format-time.pipe';
import { NtobrPipe } from './ntobr.pipe';
import { TransportType } from './transport-type.pipe';

@NgModule({
    declarations: [
        FormatTimePipe,
        NtobrPipe,
        TransportType
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormatTimePipe,
        NtobrPipe,
        TransportType
    ]
})
export class MainPipeModule {
}
