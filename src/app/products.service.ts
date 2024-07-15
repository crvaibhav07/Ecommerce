// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './model/product/product.component';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
public search = new BehaviorSubject<string>("");
public category = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  getProducts(category?:any): Observable<Product[]> {
  let apiUrl = 'https://fakestoreapi.com/products';
  
    if(category){
      apiUrl += '/category/' + category;
    }
    return this.http.get<Product[]>(apiUrl);
  }
}
