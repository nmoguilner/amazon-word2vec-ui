import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CategoryTree} from "../../entities/CategoryTree";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  categories: CategoryTree;
  @ViewChild('searchProductsInput') searchProductsInput: ElementRef;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.subscribeSearch();
  }

  getCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = this.dicToCategoryTree(categories);
    });
  }

  private dicToCategoryTree(dictionary) {
    let recursive = (dict, categoryItem: CategoryTree) => {
      const keys = Object.keys(dict);
      categoryItem.depth++;
      categoryItem.children.push(...keys.map(k => new CategoryTree(k, [], categoryItem.depth)));

      for (let childNode of categoryItem.children) {
        const key = childNode.name;
        const children = Object.keys(dict[key]);

        if (!!children.length) {
          recursive(dict[key], childNode);
        }
      }
    }

    const rootNode = new CategoryTree('root');
    recursive(dictionary, rootNode);
    return rootNode;
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
