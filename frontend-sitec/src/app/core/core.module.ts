import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RootLayoutsCore } from './layouts/rootLayoutsCore';
import { RouterModule } from '@angular/router';
import { RawCommunicatorService } from './services/raw-communicator.service';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';




@NgModule({
  declarations: [
      ...RootLayoutsCore
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ToastService,
    RawCommunicatorService
  ],
  exports: [
    HttpClientModule,
  ],
})
export class CoreModule { }
