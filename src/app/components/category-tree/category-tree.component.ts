import {Component, Input, OnInit} from '@angular/core';
import {CategoryTree} from "../../entities/CategoryTree";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-tree',
  templateUrl: './category-tree.component.html',
  styleUrls: ['./category-tree.component.less']
})
export class CategoryTreeComponent implements OnInit {

  @Input() children: CategoryTree[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

  searchByCategory(name: string) {
    this.productService.searchByCategory(name);
    this.router.navigate(['products']);
  }

}
