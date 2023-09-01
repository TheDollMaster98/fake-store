import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'product-form', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
