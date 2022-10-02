import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EIcon } from 'src/app/core/configurations/icon.icons';
import { Column, ColumnType,Action } from 'src/app/shared/components/grid/grid.component';
import { ListPageBase } from 'src/app/shared/components/list-page/list-page.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-lits-product',
  templateUrl: './lits-product.component.html',
  styleUrls: ['./lits-product.component.css']
})
export class LitsProductComponent extends ListPageBase {

  list: any[] = [];
  
  @ViewChild('statusTpl', { static: true }) statusTpl: TemplateRef<any>|null = null;

  columns: Column[] = [];
  actions: Action[] = [
    {
      icon: EIcon.deleteGrid,
      label: 'Eleminar',
      callback: (record: any) => {
        this.deletProduct(record);
      }
    },
    {
      icon: EIcon.editGrid,
      label: 'Editar producto',
      callback: (record: any) => {
        this.updateProduct(record);
      }
    }
  ];
  constructor(
    private service: ProductService
  ) {
    super({
      title: 'Prueba Fassil',
      module: 'sitec',
      breadcrumb: [
        {
          link: '/sitec/',
          label: 'Almacenes',
        },
      ],
    });
   }

   onInit(): void {
    this.readAll();
    this.columns = [
      {
        name: '#', prop: 'id', maxWidth: 50
      },
      {
        name: 'Nombre', prop: 'name'
      },
      {
        name: 'Precio Iva', prop: 'priceIva'
      },
      {
        name: 'Estado',
        prop: 'status',
        type: ColumnType.BOOLEAN,
        cellTemplate: this.statusTpl,
        maxWidth: 100
      }
    ];
   }

   readAll(){
    this.service.listProduct().subscribe(response => {
      this.list = response;
    });
  }

  updateProduct(item : any){
    this.router.navigate([`/sitec/product/update/${item.id}`]);
  }

  deletProduct(item : any){
    this.service.deleteProduct( item.id ).subscribe(() => {
      this.alert.show();
      this.readAll();
    });
  }

  create(){
    this.router.navigate([`/sitec/product/create`]);
  }
}
