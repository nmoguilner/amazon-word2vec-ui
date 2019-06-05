import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  categories = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.dicToList(categories);
    });
  }

  private dicToList(dictionary) {

    let recursive = (dict, categoryItem: CategoryItem) => {

      const keys = Object.keys(dict);
      categoryItem.depth++;
      categoryItem.children.push(...keys.map(k => new CategoryItem(k, [], categoryItem.depth)));

      for (let childNode of categoryItem.children) {

        const key = childNode.name;
        const children = Object.keys(dict[key]);

        if (!!children.length) {
          recursive(dict[key], childNode);
        }
      }
    }

    const rootNode = new CategoryItem('root');
    recursive(dictionary, rootNode);

    console.log(rootNode);

  }

}

export class CategoryItem {
  public name: string;
  public depth: number;
  public children: CategoryItem[];

  constructor(name: string, children: CategoryItem[] = [], depth = -1) {
    this.name = name;
    this.depth = depth;
    this.children = children;
  }
}
