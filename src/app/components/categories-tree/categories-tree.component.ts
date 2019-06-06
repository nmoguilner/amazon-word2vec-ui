import {Component, Input, OnInit} from '@angular/core';
import {CategoryTree} from "../../entities/CategoryTree";

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.less']
})
export class CategoriesTreeComponent implements OnInit {

  @Input() children: CategoryTree[];

  constructor() { }

  ngOnInit() {
  }

}
