import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {ProductService} from "../services/product.service";


@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(private productService: ProductService) {
  }

  resolve(): Observable<any> {
    return this.productService.initializeProducts();
  }

}
