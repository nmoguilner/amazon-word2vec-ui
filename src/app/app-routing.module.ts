import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProductsComponent} from './components/products/products.component';
import {ProductSingleComponent} from './components/product-single/product-single.component';
import {ProductsResolver} from "./router-resolvers/products.resolver";
import {CategoriesComponent} from "./components/categories/categories.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: {routeResolver: ProductsResolver}
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {path: 'products/:asin', component: ProductSingleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
