import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { IProductList } from '../interfaces/product-list';
import { IProductForm } from '../interfaces/product-form';
import { Product } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  protected urlService: string = 'https://dummyjson.com/products/';

  constructor(private http: HttpClient) { }

  // get products from API
  getAll(): Observable<IProductList[]> {
    return this.http.get<IProductList[]>(this.urlService).pipe(
      shareReplay()
    );
  }

  // get product by id from API
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(this.urlService + id).pipe(
      shareReplay()
    );
  }

  // post product to API
  post(product: IProductForm): Observable<IProductForm> {
    return this.http.post<IProductForm>(this.urlService + 'add', product);
  }

  // put product to API
  put(product: IProductForm): Observable<IProductForm> {
    return this.http.put<IProductForm>(this.urlService + product.id, product);
  }

  // delete product from API
  delete(id: number): Observable<IProductForm> {
    return this.http.delete<IProductForm>(this.urlService + id);
  }
}
