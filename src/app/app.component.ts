import {Component, OnInit} from '@angular/core';
import {ProductService} from "./services/product.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  constructor(private spinner: NgxSpinnerService, private productService: ProductService){}

  ngOnInit() {

  }
}
