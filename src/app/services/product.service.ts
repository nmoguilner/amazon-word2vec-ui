import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

   private baseProductUrl = "http://127.0.0.1:5000/products";
    
   constructor(private http: HttpClient) {
    }

    public getProducts(): Observable<any> {
        return this.http.get(this.baseProductUrl);
    }

    public getProductByAsin(asin: string) {
        return this.http.get(`${this.baseProductUrl}/${asin}`);
    }

    public getRecommendations(asin, topN): Observable<any> {
        let params = new HttpParams().set('topN', topN);
        return this.http.get(`${this.baseProductUrl}/${asin}/best`, {params});
    }


}
