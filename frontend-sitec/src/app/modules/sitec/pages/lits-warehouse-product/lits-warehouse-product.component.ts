import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EIcon } from 'src/app/core/configurations/icon.icons';
import { Column, ColumnType, Action } from 'src/app/shared/components/grid/grid.component';
import { ListPageBase } from 'src/app/shared/components/list-page/list-page.component';
import { AddProductByWarehouseComponent } from '../../components/add-product-by-warehouse/add-product-by-warehouse.component';
import { SellProductByWarehouseComponent } from '../../components/sell-product-by-warehouse/sell-product-by-warehouse.component';
import { UpdateCountProductComponent } from '../../components/update-count-product/update-count-product.component';
import { ProductService } from '../../services/product.service';
import { WareouhseProductService } from '../../services/wareouhse-product.service';

@Component({
  selector: 'app-lits-warehouse-product',
  templateUrl: './lits-warehouse-product.component.html',
  styleUrls: ['./lits-warehouse-product.component.css']
})
export class LitsWarehouseProductComponent extends ListPageBase {

  list: any[] = [];
  idWarehouse: number | null = null;

  columns: Column[] = [];
  actions: Action[] = [
    {
      icon: EIcon.editGrid,
      label: 'Vender',
      callback: (record: any) => {
        this.sellProduct(record);
      }
    },
    {
      icon: EIcon.editGrid,
      label: 'Editar Cantidad',
      callback: (record: any) => {
        this.editCountProduct(record);
      }
    }
  ];
  constructor(
    private service: WareouhseProductService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
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
        name: 'Nombre producto', prop: 'nameProduct'
      },
      {
        name: 'Precio Iva', prop: 'price'
      },
      {
        name: 'Cantidad', prop: 'count'
      },
    ];
   }

   readAll(){

    this.idWarehouse = Number(this.activatedRoute.snapshot.params['id']);
    if(this.idWarehouse == null){
      this.router.navigate([`/sitec/warehouse`]);
    }
    this.service.listProductByWarehouse(this.idWarehouse).subscribe(response => {
      this.list = response;
    });
  }

  
  editCountProduct(item : any){
    const modalRef = this.modalService.open(UpdateCountProductComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.result.then((response) => {
      if (response?.result) {
        const data =response?.result;
        this.service.updateCountProduct(this.idWarehouse as number,data).subscribe(response => {
          this.alert.show({ text: 'Se vendio éxitosamente' });
          this.readAll();
        });
      }
    });
  }

  sellProduct(item : any){

    const modalRef = this.modalService.open(SellProductByWarehouseComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((response) => {
      if (response?.result) {
        const data =response?.result;
        this.service.sellProduct(this.idWarehouse as number,data).subscribe(response => {
          this.alert.show({ text: 'Se vendio éxitosamente' });
          this.readAll();
        });
      }
    });
  }

  addProductWarehouse(){
    const modalRef = this.modalService.open(AddProductByWarehouseComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.result.then((response) => {
      if (response?.result) {
        const data =response?.result;
        data.warehouseId=this.idWarehouse;
        this.service.addProductWarehouse(data).subscribe(response => {
          this.alert.show({ text: 'Se guardó éxitosamente' });
          this.readAll();
        });
      }
    });

  }
}