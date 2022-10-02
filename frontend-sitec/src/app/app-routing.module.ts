import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstLayoutComponent } from './core/layouts/first-layout/first-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sitec',
    pathMatch: 'full'
  },
  {
    path: 'sitec',
    component: FirstLayoutComponent,
    loadChildren: () => import('./modules/sitec/sitec.module').then(m => m.SitecModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
