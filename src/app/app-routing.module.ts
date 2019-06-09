import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductSingleComponent} from './components/product-single/product-single.component';
import {ProductsResolver} from "./router-resolvers/products.resolver";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent,
    resolve: {routeResolver: ProductsResolver}
  },
  {path: 'products/:asin', component: ProductSingleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
