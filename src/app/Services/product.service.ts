import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { IProduct } from '../Models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.baseUrl}/products`); // 'http://localhost:3000/product'
  }
  getProductByID(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${environment.baseUrl}/products/${id}`);
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${environment.baseUrl}/products`, product);
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(
      `${environment.baseUrl}/products/${product.id}`,
      product
    );
  }
  addToWishlist(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      `${environment.baseUrl}/wishlist/`,
      product
    );
  }
/*
  checkInWishlist(product: IProduct): Observable<boolean> {
    return this.http.get<IProduct[]>(`${environment.baseUrl}/wishlist/?id=${product.id}`)
      .pipe(
        switchMap((product) => {
          return product.length == 0 ? this.http.post<IProduct>(`${environment.baseUrl}/wishlist`,product).pipe(map(() => true))
          :
          this.http.delete<IProduct>(`${environment.baseUrl}/wishlist/${product[0].id}`).pipe(map(() => false))
                          
        })
      );
  }
*/


checkInWishlist(product: IProduct): Observable<boolean> {

return this.http.get<IProduct[]>(`${environment.baseUrl}/wishlist/?id=${product.id}`).pipe(
  switchMap(products => {
    if (products.length > 0) {
      return this.http.delete(`${environment.baseUrl}/wishlist/${products[0].id}`).pipe(
        map(() => false)
      );
    } else {
      return this.http.post<IProduct>(`${environment.baseUrl}/wishlist`, product).pipe(
        map(() => true)
      );
    }
  })
);
}


}
