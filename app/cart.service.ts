import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './model/product/product.component';

@Injectable({
  providedIn: 'root'
})


export class CartService {

  public cartItemList: Product[]= [];
  public productList = new BehaviorSubject<Product[]>([]);

  // private apiUrl = 'https://fakestoreapi.com/carts/'; 

  constructor(private http:HttpClient) { }

  getProduct(){
return this.productList.asObservable();
  }

  setProduct(product: Product[]){
this.cartItemList.push(...product);
this.productList.next(product)
  }

  addToCart(product:Product){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList)
this.getTotalPrice();
console.log(this.cartItemList);

  }

  getTotalPrice(): number{
let grandTotal = 0;
this.cartItemList.map((item:any) => {
  grandTotal += item.total;
})

return grandTotal
  }


removeCartItem(product: Product){
this.cartItemList.map((a:any, index:any) => {
  if(product.id == a.id){
    this.cartItemList.splice(index,1)
  }
})
}

removeAllCart(){
this.cartItemList = [];
this.productList.next(this.cartItemList);
}

// ------------
// updateCartItem(itemId: number, updatedItem: any): Observable<any> {
//   const patchUrl = `${this.apiUrl}/${itemId}`;
//   return this.http.patch<any>(patchUrl, updatedItem);
// }

}
