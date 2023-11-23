import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ntobr'
})
export class NtobrPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.toString().replace(/\n/gi,'<br>');
  }

}
