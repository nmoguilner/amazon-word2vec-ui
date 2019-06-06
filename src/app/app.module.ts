import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CustomReuseStrategy} from './app-route-reuse-strategy';
import {RouteReuseStrategy} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import {AccordionModule, BsDropdownModule} from "ngx-bootstrap";
import { CategoriesTreeComponent } from './components/categories-tree/categories-tree.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsListComponent,
    ProductsComponent,
    ProductSingleComponent,
    CategoriesTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
