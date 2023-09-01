import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { NewProduct } from './interfaces/Product';
import { Router } from '@angular/router';

import { Product } from './interfaces/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string

  constructor(private httpClient: HttpClient, private router: Router) {
    this.url = 'https://fakestoreapi.com/products';
  }

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url).pipe(delay(1000));
  }

  // fetchProductById(id: number): Observable<Product> {
  //   return this.httpClient.get<Product>(this.url + `/${id}`).pipe(delay(800));
  // }

  fetchProductById(id: number): Observable<Product|undefined> {

    return this.httpClient.get<object>(`https://fakestoreapi.com/products/${id}`).pipe(delay(500)).pipe(map(o=>{

      if(!o)
        this.router.navigateByUrl('not-found')

      return o as Product

    }));
  }

  createProduct(newProduct: NewProduct): Observable<NewProduct> {
    return this.httpClient.post<Product>(this.url, newProduct);
  }
}
