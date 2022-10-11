import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AddProductRequest } from '../models/api-models/add-product-request.model';
import { Product } from '../models/api-models/product.model';
import { UpdateProductRequest } from '../models/api-models/update-product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseApiUrl + '/Products');
  }

  getProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseApiUrl + '/Products/' + productId);
  }

  updateProduct(productId: string, productRequest: Product): Observable<Product>{
    const updateProductRequest: UpdateProductRequest ={
      productName: productRequest.productName,
      cost: productRequest.cost,
      quantity: productRequest.quantity,
      companyName: productRequest.companyName
    }
    return this.httpClient.put<Product>(this.baseApiUrl + '/Products/' + productId, updateProductRequest);
  }

  deleteProduct(productId: string): Observable<Product>{
    return this.httpClient.delete<Product>(this.baseApiUrl + '/Products/' + productId);
  }

  addProduct(productRequest: Product): Observable<Product>{
    const addProductRequest: AddProductRequest = {
      productName: productRequest.productName,
      cost: productRequest.cost,
      quantity: productRequest.quantity,
      companyName: productRequest.companyName
  };
  return this.httpClient.post<Product>(this.baseApiUrl + '/Products/Add', addProductRequest);
}
}
