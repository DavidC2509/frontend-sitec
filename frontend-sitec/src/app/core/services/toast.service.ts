import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
/**
 * Servicio Generico para el uso de mensajes tipo toast
 * 
 * {@link https://github.com/scttcper/ngx-toastr | Documentación oficial REPOSITORIO del paquete de toast}
 * {@link https://www.npmjs.com/package/ngx-toastr | Documentación oficial NPM del paquete de toast}
 * {@link https://ngx-toastr.vercel.app/ | Demo de uso de paquete}
 * 
 * @example 
 * 1. injectar servicio en el constructor
 * 2. implentación: 
 *    this.toast.show({type:'error',text:'prueba',timeOut:5000});
 *
 */
@Injectable()
export class ToastService {
  constructor(private toastrService: ToastrService) {}

  show(options?: {
    title?: string;
    text?: string;
    timeOut?: number;
    extendedTimeOut?: number;
    positionClass?: keyof typeof AlertPosition;
    progressBar?: boolean;
    closeButton?: boolean;
    tapToDismiss?: boolean;
    disableTimeOut?: boolean;
    preventDuplicates?: boolean;    
    enableHtml?: boolean;    
    type?: keyof typeof AlertType;
  }): void {
    const tmp = Object.assign(
      {
        title: '¡ Muy Bien !',
        text: 'Se actualizó con éxito.',
        timeOut:2000,
        extendedTimeOut: 0,
        positionClass: 'toast-top-right',
        progressBar: false,
        closeButton: false,
        tapToDismiss: true,
        disableTimeOut: false,
        preventDuplicates: false,
        enableHtml: true,
        type: 'success',
      },
      options
    );
    this.toastrService[tmp.type](tmp.text, tmp.title, {
      timeOut: tmp.timeOut,
      extendedTimeOut: tmp.extendedTimeOut,
      positionClass: tmp.positionClass,
      progressBar: tmp.progressBar,
      tapToDismiss: tmp.tapToDismiss,
      closeButton: tmp.closeButton,
      disableTimeOut: tmp.disableTimeOut,
      enableHtml: tmp.enableHtml,
    });
  }

  async confirm(options?: {
    title?: string,
    text?: string,
    html?: string,
    type?: keyof typeof AlertType,
    confirmButtonText?: string,
    cancelButtonText?: string,
    cancelButtonColor?: string,
    confirmButtonColor?: string
  }): Promise<boolean> {
    const tmp = Object.assign({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      html:``,
      type: 'warning',
      confirmButtonText: '¡Sí, continuar!',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }, options);
  
    return Swal.fire({
      title: tmp.title,
      text: tmp.text,
      html: tmp.html,
      showCancelButton: true,
      confirmButtonColor: tmp.confirmButtonColor,
      cancelButtonColor: tmp.cancelButtonColor,
      confirmButtonText: tmp.confirmButtonText,
      cancelButtonText: tmp.cancelButtonText
    }).then((response: any) => {
      return !!response.value;
    });
  }
}



enum AlertType {
  success,
  error,
  info,
  warning,
}

enum AlertPosition {
  toastTopLeft = 'toast-top-left',
  toastTopRight = 'toast-top-right',
  toastButtonRight = 'toast-bottom-right',
  toastButtonLeft = 'toast-bottom-left',
}
