import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./components/product/list/list.component').then(c => c.ListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/product/form/form.component').then(c => c.FormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/product/form/form.component').then(c => c.FormComponent)
      },
      {
        path: 'view/:id',
        loadComponent: () => import('./components/product/form/form.component').then(c => c.FormComponent)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
