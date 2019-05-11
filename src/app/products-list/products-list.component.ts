import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent implements OnInit {

  products = [];
  totalProducts = 0;

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.spinner.show();
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.totalProducts = data.length;
      this.spinner.hide();
    });
  }

  // getRecommendations(asin) {
  //   const topN = 5;
  //   return this.productService.getRecommendations(asin, topN).subscribe(data => {
  //     const recommended = data.map(d => JSON.parse(d))[0]
  //     console.log(recommended);
  //   });
  // }

  goToProduct(asin) {
    this.router.navigate(['./products/' + asin]);
  }


}
