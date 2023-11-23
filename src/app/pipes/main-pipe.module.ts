import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormatTimePipe} from './format-time.pipe';
import { NtobrPipe } from './ntobr.pipe';

@NgModule({
    declarations: [
        FormatTimePipe,
        NtobrPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormatTimePipe,
        NtobrPipe
    ]
})
export class MainPipeModule {
}
