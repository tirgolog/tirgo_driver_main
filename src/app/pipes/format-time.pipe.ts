import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'date-fns';
import * as ruLocale from 'date-fns/locale/ru/index.js';

@Pipe({
    name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(d: string, fmt: string, ifmt = 'YYYY-MM-DDTHH:mm:ss'): string {
        // console.log(new Date(d+'Z'))
        return format(new Date(d), fmt, {locale: ruLocale});
    }
}
