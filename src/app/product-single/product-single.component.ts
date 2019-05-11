import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.less']
})
export class ProductSingleComponent implements OnInit {

  public product;
  public recommended;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const asin = this.route.snapshot.paramMap.get('asin');
    this.productService
      .getProductByAsin(asin)
      .subscribe((product: string) => {
        this.product = JSON.parse(product)[0];
        console.log(this.product);
      });

    this.getRecommendations(asin);

  }

  getRecommendations(asin) {
    const topN = 5;
    return this.productService.getRecommendations(asin, topN).subscribe(data => {
      this.recommended = data.map(d => JSON.parse(d)[0])
      console.log(this.recommended);
      this.spinner.hide();
    });
  }

}
