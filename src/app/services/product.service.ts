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
          next: products => {
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


}
