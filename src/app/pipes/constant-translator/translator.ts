import { Pipe, PipeTransform } from '@angular/core';

import data from '../../../assets/strings/const.json';

@Pipe({
  name: 'translate',
  pure: false
})

export class TranslatorPipe implements PipeTransform {

  constructor() {
  }
  transform(value: string): string {

    return data[value]

  }
}
