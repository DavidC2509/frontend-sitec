import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class WareouhseProductService extends HttpService {
  constructor(  http: HttpClient,spinner:NgxSpinnerService ) {
      super(http, spinner);
  }


  //Almacenes Producti
  listProductByWarehouse(id: number) {
    return this.get<any[]>(`/fassil/warehouse-product/${id}/list`, true);
  }

  sellProduct(id: number,data :any) {
    return this.post<any[]>(`/fassil/warehouse-product/${id}/sale`, data,true);
  }

  addProductWarehouse(data:any) {
    return this.post<any[]>(`/fassil/warehouse-product`, data,true);
  }

  updateCountProduct(id: number,data :any) {
    return this.put<any>(`/fassil/warehouse-product/${id}`,data,true);
  }
}