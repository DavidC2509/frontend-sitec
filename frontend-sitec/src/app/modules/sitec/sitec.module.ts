import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootPagesSitec } from './pages/rootPagesSitec';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { RoutesSitec } from './sitec-routing.module';
import { RootServicesSitec } from './services/rootServicesBilling';




@NgModule({
  declarations: [
    ...RootPagesSitec
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesSitec,
    CoreModule
  ],
  providers: [
    ...RootServicesSitec
  ]
})

export class SitecModule {

}
