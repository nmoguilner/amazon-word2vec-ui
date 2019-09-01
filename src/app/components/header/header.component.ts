import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CategoryTree} from "../../entities/CategoryTree";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  categories: CategoryTree;
  @ViewChild('searchProductsInput') searchProductsInput: ElementRef;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit() {
    this.subscribeSearch();
  }

  resetProducts() {
    this.productService.resetProducts();
    this.router.navigate(['products']);
    this.searchProductsInput.nativeElement.value = '';
  }

  private subscribeSearch() {
    return fromEvent(this.searchProductsInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(190),
      distinctUntilChanged()
    ).subscribe((text: string) => {
        this.productService.searchProducts(text.toLowerCase());
      },
      error => console.log(error)
    );
  }

}
