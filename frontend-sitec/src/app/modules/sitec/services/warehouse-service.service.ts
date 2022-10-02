import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable()
export class WarehouseServiceService extends HttpService {
  constructor(  http: HttpClient,spinner:NgxSpinnerService ) {
      super(http, spinner);
  }


  //Almacenes
  listWarehouse() {
    return this.get<any[]>(`/fassil/warehouse/list`, true);
  }

  deletWarehouse(id: number ) {
    return this.delete<any[]>(`/fassil/warehouse/${id}/delete`, true);
  }

  postWarehouse(data :any) {
    return this.post<any[]>(`/fassil/warehouse`,data,true);
  }
}
