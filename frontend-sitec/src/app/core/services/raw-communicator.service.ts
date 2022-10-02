import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpService} from 'src/app/core/services/http.service';

@Injectable()
export class RawCommunicatorService extends HttpService {

  constructor(  http: HttpClient,spinner:NgxSpinnerService ) {
      super(http, spinner);
  }

  read(url: string) {
    return this.get(url, true, false);
  }
}
