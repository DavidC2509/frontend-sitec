import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponseCustom } from '../utils/http-error-response-custom';
import { NavigationEnd, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
/**
 * Interceptor generico para el manejo de errores de respuestas del servidor
 * 
 * @references
 * {@link https://www.codegrepper.com/code-examples/typescript/how+to+reload+same+page+in+angular+8 | Recargar la pagina en el mismo url }
 * 
 */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private modalService: NgbModal,
              private router: Router,
              private toast: ToastService,
              ) {
                localStorage.removeItem( KEY_STORE.isShowModalLogin );
                localStorage.removeItem( KEY_STORE.isMethodGET );
              }

private get isShowModalLogin(){
  return localStorage.getItem(KEY_STORE.isShowModalLogin) || ""; 
}

private set isMethodGET(value:string){
  localStorage.setItem(KEY_STORE.isMethodGET, value); 
}

private get isMethodGET(){
  return localStorage.getItem(KEY_STORE.isMethodGET) || ""; 
}

private set isShowModalLogin(value:string){
  localStorage.setItem(KEY_STORE.isShowModalLogin, value); 
}

private removeItemStore(key:string){
  localStorage.removeItem(key);        
}

  
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
  }

  isMethodStore(method:string){
    const methodStore:Array<string> = ["POST","PUT","DELETE"];
    return methodStore.some(item=>item === method);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {    
     return next.handle(req).pipe(
       catchError((error : any)=> {        
         let errorMessage: string = '';
         let showAlertError: boolean = false;
          if (error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Client-side error: ${error.error.message}`;
          } else {
            // backend error
            switch (error.status) {
              
              case 401:                            
                showAlertError = false;
                errorMessage = MessageResponseError.NOT_LOGIN;  

                this.removeItemStore("REQ");
                localStorage.setItem("REQ", JSON.stringify(req) );              
              break;

              case 403:                
                // this.reloadComponent();
                showAlertError = true;
                errorMessage = MessageResponseError.NOT_PERMISSION  + "(" + error.error +")" + "\n" +
                "Contáctese  con el administrador.";                
                this.router.navigate(['/home/dashboard']);
              break;

              case 400:                                                       
                showAlertError = true;
                errorMessage = new HttpErrorResponseCustom().getMessageErrorGenericResponse( error );
                if( typeof error.error == 'string' && error.error.toUpperCase() == `El usuario no tiene permisos para gestionar los artículos del almacén`.toUpperCase() ){
                    this.router.navigate(['/home/dashboard']);
                }              
              break;

              case 415:              
                showAlertError = true;
                errorMessage = MessageResponseError.ERROR_FORMAT_DATA;                
              break;

              default:
                showAlertError = true;
                errorMessage = new HttpErrorResponseCustom().getMessageErrorGenericResponse( error );                    
              break;  
            } 
          }
                  
         if(showAlertError){
          this.showWarning(errorMessage);            
         }
         
         return throwError(errorMessage);
       })
     )
    //  .subscribe(resp=>{
    //  })
   }

   showWarning(message: string): void {
    this.toast.show({
      title:'Advertencia!',
      text: message,
      type:'warning'
    });                
  }

}

export enum MethodHttp{
  GET = "GET"
}

export enum KEY_STORE {
  isShowModalLogin = "isShowModalLogin",
  isMethodGET = "isMethodGET",
}

export enum MessageResponseError{
  NOT_PERMISSION = `No cuenta con los permisos suficientes para realizar esta acción `,
  NOT_LOGIN = `No tiene una sesión activa.`,
  ERROR_FORMAT_DATA = `El servidor no puede procesar la petición del navegador porque tiene un formato que este no entiende.`,
}