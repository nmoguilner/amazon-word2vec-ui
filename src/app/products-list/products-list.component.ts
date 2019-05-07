import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  products = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
        this.productService.getProducts().subscribe(data => {
            this.products = data;
        });
  }

  getRecommendations(asin) {
    const topN = 5;
    return this.productService.getRecommendations(asin, topN).subscribe(data => {
     console.log(data);
  });
  }


}
