import { HttpErrorResponse } from '@angular/common/http';

export class HttpErrorResponseCustom {
  constructor() {}

  private isValidFormatErrorGeneric(validParams: any): boolean {
    try {
      let valid = false;
      if (Array.isArray(validParams)) {
        let body = ['code', 'message', 'isWarning'];
        validParams.forEach((attr) => {
          if (
            attr.hasOwnProperty(body[0]) &&
            attr.hasOwnProperty(body[1]) &&
            attr.hasOwnProperty(body[2])
          ) {
            valid = true;
          } else {
            valid = false;
            return;
          }
        });
      }
      return valid;
    } catch (err) {
      return false;
    }
  }

  private getTextOfArrayErrors(errors: any[]): string {
    let msg = '';
    let body = ['code', 'message', 'isWarning'];
    errors.forEach((attr) => {
      msg += attr['message'] + '<br>';
    });
    return msg === '' ? `Ocurrió un error desconocido` : msg;
  }

  getMessageErrorGenericResponse(response: any): string {
    let message:any = null;
    let messageError = `Ocurrió un error desconocido`;
    try {
      if (!response.error) {
        return messageError;
      }

      if (typeof response.error === 'string') {
        const separator:string[] = response.error.split("\n");
        if(separator.length>0){
          message ='<ul style="text-align: left;">';
          separator.forEach((msg:string) => {
            message += "<li>"+ msg + '</li>';
          });
          message +='</ul>';
        }else{
          message = response.error;
        }
      } else {
        if (this.isValidFormatErrorGeneric(response.error)) {
          message = this.getTextOfArrayErrors(response.error);
        }
      }

      return message ? message : messageError;
    } catch (err) {
      return messageError;
    }
  }
}
