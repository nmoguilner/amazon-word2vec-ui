import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, forkJoin, Observable, of, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Product} from "../entities/Product";
import {NgxSpinnerService} from "ngx-spinner";
import {tap} from "rxjs/operators";

@Injectable()
export class ProductService {

  private baseProductUrl = "http://127.0.0.1:5000/products";

  public productsBS: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public selectedProductBS: Subject<Product> = new Subject<Product>();

  private allProducts: Product[] = [];

  constructor(private http: HttpClient, private spinnerService: NgxSpinnerService) {
  }

  private getProducts(): Observable<any> {
    return this.http.get(this.baseProductUrl);
  }

  private getProductByAsin(asin: string): Observable<any> {
    return this.http.get(`${this.baseProductUrl}/${asin}`);
  }

  private getRecommendations(asin, topN): Observable<any> {
    let params = new HttpParams().set('topN', topN);
    return this.http
      .get(`${this.baseProductUrl}/${asin}/best`, {params})
  }

  public resetProducts() {
    this.productsBS.next(this.allProducts);
  }

  public getProductAndRecommendations(asin: string, topN: number) {
    this.spinnerService.show();
    forkJoin(
      this.getProductByAsin(asin),
      this.getRecommendations(asin, topN)
    ).subscribe(resp => {
        const prod: Product = JSON.parse(resp[0])[0];
        const rec: Product[] = resp[1].map(r => JSON.parse(r)[0]);
        prod.recommended = rec;
        this.selectedProductBS.next(prod);
      },
      error => console.log(error),
      () => this.spinnerService.hide())
  }

  initializeProducts(): Observable<any> {
    if (!this.productsBS.value.length) {
      this.spinnerService.show();
      return this.getProducts().pipe(
        tap({
          next: (products: Product[])=> {
            // flatten categories array
            products = products.map(prod => {
              prod.categories = (prod.categories as any)[0];
              return prod;
            });
            this.allProducts = products;
            this.productsBS.next(products);
          },
          error: err => console.log(err),
          complete: () => this.spinnerService.hide()
        }),
      )
        ;
    } else {
      return of([]);
    }
  }

  public getCategories(): Observable<any> {
    return this.http.get(`${this.baseProductUrl}/categories`);
  }

  public searchProducts(text: string) {

    let filtered: Product[] = [];
    filtered = this.allProducts.filter(prod => {
      return (
        prod.asin.toLowerCase().includes(text) ||
        prod.title.toLowerCase().includes(text) ||
        prod.brand.toLowerCase().includes(text) ||
        String(prod.price).includes(text) ||
        prod.description.toLowerCase().includes(text) ||
        prod.categories.some(cat => cat.toLowerCase().includes(text))
      );
    });

    this.productsBS.next(filtered);
  }


}
