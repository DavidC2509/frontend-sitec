import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LitsWarehouseComponent } from "./pages/lits-warehouse/lits-warehouse.component";

const routes: Routes = [
    {
      path: 'warehouse',
      component: LitsWarehouseComponent,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutesSitec {}


