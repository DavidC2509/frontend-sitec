import { Pipe, PipeTransform } from '@angular/core';

// {{ value | fileSize: 2,1 }}

@Pipe({
  name: 'generalPipe',
})
export class GeneralPipe implements PipeTransform {

  transform(value: boolean, trueTex: string,falseText:string) {
    return value ? trueTex : falseText ;
  }
}
