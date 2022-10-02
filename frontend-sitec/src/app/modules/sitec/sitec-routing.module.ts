import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LitsWarehouseComponent } from "./pages/lits-warehouse/lits-warehouse.component";
import { LitsProductComponent } from './pages/lits-product/lits-product.component';
import { EditionProductComponent } from "./pages/lits-product/edition-product/edition-product.component";
import { LitsWarehouseProductComponent } from "./pages/lits-warehouse-product/lits-warehouse-product.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'warehouse',
    pathMatch: 'full'
  },
    {
      path: 'warehouse',
      component: LitsWarehouseComponent,
    },

    {
      path: 'product',
      component: LitsProductComponent,
    },

    {
      path: 'product/create',
      component: EditionProductComponent,
    },

    {
      path: 'product/update/:id',
      component: EditionProductComponent,
    },
    
    {
      path: 'warehouse/:id/product',
      component: LitsWarehouseProductComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutesSitec {}


