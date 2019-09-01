import {Component, Input, OnInit} from '@angular/core';
import {CategoryTree} from "../../entities/CategoryTree";
import {Product} from "../../entities/Product";
import {ProductService} from "../../services/product.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryTree[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService
      .categoriesBS
      .subscribe((categories: CategoryTree) => {
        if (!categories || !categories.children.length) {
          return;
        }
        this.categories = categories.children;
      });

  }


}
