import { Component, OnInit } from '@angular/core';
import { EIcon } from 'src/app/core/configurations/icon.icons';
import { Action, Column } from 'src/app/shared/components/grid/grid.component';
import { ListPageBase } from 'src/app/shared/components/list-page/list-page.component';
import { WarehouseServiceService } from '../../services/warehouse-service.service';

@Component({
  selector: 'app-lits-warehouse',
  templateUrl: './lits-warehouse.component.html',
  styleUrls: ['./lits-warehouse.component.css']
})
export class LitsWarehouseComponent extends ListPageBase {

  list: any[] = [];
  
  columns: Column[] = [];
  actions: Action[] = [
    {
      icon: EIcon.editGrid,
      label: 'Editar',
      callback: (record: any) => {
        
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
    ];
   }

   readAll(){
    this.service.listWarehouse().subscribe(response => {
      this.list = response;
    });
  }
}
