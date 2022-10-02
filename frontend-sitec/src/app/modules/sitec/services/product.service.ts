import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class ProductService extends HttpService {
  constructor(  http: HttpClient,spinner:NgxSpinnerService ) {
      super(http, spinner);
  }

  //Almacenes
  listProduct() {
    return this.get<any[]>(`/fassil/product/list`, true);
  }

  deleteProduct(id: number ) {
    return this.delete<any[]>(`/fassil/product/${id}/delete`, true);
  }

  storeProduct(data:any) {
    if (data.id === null) {
      return this.post<any>(`/fassil/product`, data, true );
    } else {
      return this.put<any>( `/fassil/product/${data.id}/update`, data, true );
    }
  }

  getProduct(id: number) {
    return this.get<any>(`/fassil/product/${id}`,true);
  }
}
