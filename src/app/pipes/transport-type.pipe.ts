import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Pipe({
  name: 'transporttype'
})
export class TransportType implements PipeTransform {

  constructor(public authService: AuthenticationService) {}

  transform(value: any, ...args: any[]): any {
    console.log('type', value)
    const index = this.authService.typetruck.findIndex(e => +e.id === +value)
    if (index >= 0) {
      return this.authService.typetruck[index].name
    } else {
      return 'Не выбрано'
    }
  }

}
