import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from "ngx-spinner";
import { CoreModule } from "../core/core.module";
import { RootDirectivesShared } from './directives/rootdirectivesShared';
import { RootPipesShared } from './pipes/rootPipesShared';
import { RootComponentsShared, RootComponentPipesShared } from './components/rootcomponentsShared';


const components= [
  ...RootComponentsShared,
  ...RootDirectivesShared
];


@NgModule({
  declarations: [
    ...RootPipesShared,
    RootComponentPipesShared,
    components
   
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    NgbModule,
    NgxSpinnerModule,
    NgxDatatableModule

  ],
  providers: [

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...RootPipesShared,
    CoreModule,
    components,
    NgbModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
