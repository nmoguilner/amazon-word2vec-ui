import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../entities/Product";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.less']
})
export class ProductSingleComponent implements OnInit {

  public product: Product;
  public recommended: Product[];

  private topRecommendations = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    const asin = this.route.snapshot.paramMap.get('asin');

    this.productService.selectedProductBS
      .subscribe((product: Product) => {
        this.product = product;
        this.recommended = product.recommended;
      });

    this.productService.getProductAndRecommendations(asin, this.topRecommendations);

  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  goToProduct(asin) {
    this.router.navigate(['./products/' + asin]);
    this.productService.getProductAndRecommendations(asin, this.topRecommendations);
    this.scrollTop();
  }


}
