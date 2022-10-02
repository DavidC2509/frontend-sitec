import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EIcon } from 'src/app/core/configurations/icon.icons';
import { Action, Column, ColumnType } from 'src/app/shared/components/grid/grid.component';
import { ListPageBase } from 'src/app/shared/components/list-page/list-page.component';
import { WarehouseServiceService } from '../../services/warehouse-service.service';

@Component({
  selector: 'app-lits-warehouse',
  templateUrl: './lits-warehouse.component.html',
  styleUrls: ['./lits-warehouse.component.css']
})
export class LitsWarehouseComponent extends ListPageBase {

  list: any[] = [];
  
  @ViewChild('statusTpl', { static: true }) statusTpl: TemplateRef<any>|null = null;

  columns: Column[] = [];
  actions: Action[] = [
    {
      icon: EIcon.deleteGrid,
      label: 'Eleminar',
      callback: (record: any) => {
        this.deletWarehouse(record);
      }
    },
    {
      icon: EIcon.include,
      label: 'Añadir producto',
      callback: (record: any) => {
        this.addProduct(record);
      }
    }
  ];
  constructor(
    private service: WarehouseServiceService
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
        name: 'Lugar', prop: 'place'
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
    this.service.listWarehouse().subscribe(response => {
      this.list = response;
    });
  }

  deletWarehouse(item : any){
    this.service.deletWarehouse( item.id ).subscribe(() => {
      this.alert.show();
      this.readAll();
    });
  }

  addProduct(item : any){
    this.router.navigate([`/sitec/warehouse/${item.id}/product`]);
  }
}
