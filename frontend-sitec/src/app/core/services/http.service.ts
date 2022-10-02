import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig as environment } from '../utils/config';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

export class HttpService {
  protected DOMAIN: string;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) {
    this.DOMAIN = environment.apiUrl;
  }

  protected _loadCache<T>(data: T[]): Observable<T[]> {
    return new Observable((observer) => {
      observer.next(data);
      observer.complete();
      return {
        unsubscribe() { }
      };
    });
  }

  private hideSpinnerWithTimeout( showSpinner: boolean, seconds:number = 250 ): void {
    if ( showSpinner ) {
      setTimeout(() => {
        this.spinner.hide();
      }, seconds );
    }
  }
  
  private _executeApi<T>(api: any, showError: boolean, showSpinner: boolean): Observable<T> {    
    if (showSpinner) {
      this.spinner.show();
    }
    return new Observable((observer) => {
      api.subscribe({
        next: (response: T) => {
          observer.next(response);
          this.hideSpinnerWithTimeout( showSpinner );
        },
        error: (response: HttpErrorResponse) => {         
          observer.error(response);
          this.hideSpinnerWithTimeout( showSpinner );          
        },
        complete: () => {
          observer.complete();
          this.hideSpinnerWithTimeout( showSpinner );
        }
      });
      return {
        unsubscribe() { }
      };
    });
  }

  protected get<T>(url: string, useCredentials: boolean = true, showSpinner: boolean = true): Observable<T> {
    const headers: HttpHeaders = new HttpHeaders();
    let options = {};
    options = {
      headers: headers.append('Authorization', "auth" ? `Bearer 23123` : '')
    };
   

    return this._executeApi(this.http.get(this.DOMAIN + url, options), true, showSpinner);
  }

  protected post<T>(
    url: string,
    form: any,
    useCredentials: boolean = true,
    useCokies: boolean = true,
    showError: boolean = true,
    showSpinner: boolean = true
  ): Observable<T> {
    const formData = form;
    const headers: HttpHeaders = new HttpHeaders();
    let options: {
      headers?: HttpHeaders,
      withCredentials?: boolean
    } = {};
    
       
    options = {
      headers: headers.append('Authorization', "auth" ? `Bearer 23123` : '')
      .append('Content-type', 'application/json')
      .append('Access-Control-Allow-Origin',`*`)
    };
  

    return this._executeApi(this.http.post(this.DOMAIN + url, formData, options), showError, showSpinner);
  }

  protected put<T>(
    url: string,
    form: any,
    useCredentials: boolean = true,
    showError: boolean = true,
    showSpinner: boolean = true
  ): Observable<T> {
    //const formData = this.convertToFormData(form);
    const formData = form;
    const headers: HttpHeaders = new HttpHeaders();
    let options = {};
   
    options = {
      headers: headers.append('Authorization', "auth" ? `Bearer 23123` : '')
    };

    return this._executeApi(this.http.put(this.DOMAIN + url, formData, options), showError, showSpinner);
  }

  protected delete<T>(
    url: string,
    useCredentials: boolean = true,
    showSpinner: boolean = true
  ): Observable<T> {
    const headers: HttpHeaders = new HttpHeaders();
    let options = {};
    
    options = {
      headers: headers.append('Authorization', "auth" ? `Bearer 23123` : '')
      .append('Content-type', 'application/json')
      .append('Access-Control-Allow-Origin',`*`)
    };

    return this._executeApi(this.http.delete(this.DOMAIN + url, options), true, showSpinner);
  }

  protected getApiNetwork<T>(
    url: string,
    useCredentials: boolean = false,
    showSpinner: boolean = true
  ): Observable<T> {
    let options = {};
    return this._executeApi(this.http.get(url, options), true, showSpinner);
  }

  private _processErrorResponse(data: any) {
    if (data) {
      const messages: string[] = [];
      for (const message of data) {
        messages.push(message.message);
      }
      this.showError(messages);
    } else {
      this.showError(['Ocurrió un error desconocido en la ejecución del servicio']);
    }
  }

  showError(message: string[]): void {
    Swal.fire('Error', message[0], 'error');
  }

  showWarning(message: string[]): void {
    Swal.fire('Advertencia', message[0], 'warning');
  }
}
