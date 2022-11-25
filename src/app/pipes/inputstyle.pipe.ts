import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputstyle'
})
export class InputstylePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
