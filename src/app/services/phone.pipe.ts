import { Pipe, PipeTransform } from '@angular/core';
import { format, ParsedNumber, formatNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    let newValue = format(value,'International');
    newValue = newValue.replace(/ /g, '-');
    return newValue;
  }

}
