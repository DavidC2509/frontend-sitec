import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputErrorShow',
})
export class InputErrorPipe implements PipeTransform {
  transform(inputControl: any, args?: any): any {
    let response = '';

    if (inputControl.invalid) {
      if (inputControl.errors !== null) {
        if (inputControl.errors.required) {
          response += 'Obligatorio\n';
        }
        if (inputControl.errors.email) {
          response += 'Debe ingresar un email válido\n';
        }
        if (inputControl.errors.minlength) {
          let item = inputControl.errors.minlength;
          response += `Mínimo ${item.requiredLength} carácteres\n`;
        }
        if (inputControl.errors.maxlength) {
          let item = inputControl.errors.maxlength;
          response += `Máximo ${item.requiredLength} carácteres\n`;
        }
        if (inputControl.errors.min) {
          let item = inputControl.errors.min;
          response += `Número introducido debe ser mayor o igual a ${item.min}\n`;
        }
        if (inputControl.errors.max) {
          let item = inputControl.errors.max;
          response += `Número introducido debe ser menor o igual a ${item.max}\n`;
        }
        if (inputControl.errors.ValidatorNumber) {
          let item = inputControl.errors.ValidatorNumber;
          response += `Número introducido debe ser menor o igual a ${item.max}\n`;
        }
        if (inputControl.errors.regex) {
          const msg = inputControl.errors.regex;
          response += `${msg}\n`;
        }
        if (inputControl.errors.datemin) {
          const msg = inputControl.errors.datemin;
          response += `${msg}\n`;
        }
        if (inputControl.errors.datemax) {
          const msg = inputControl.errors.datemax;
          response += `${msg}\n`;
        }
      }
    }
    return response;
  }
}
