import { Component } from '@angular/core';
import { CartService } from '../../cart.service';
import { Product } from '../../model/product/product.component';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  products: Product[] = [];
  grandTotal!: number;

  // updatedItem: any = {  quantity: 0 };

  constructor(private cartService:CartService){}

  ngOnInit(): void{
    this.cartService.getProduct().subscribe(res => {
      this.products = res;
      // this.updatedItem = { ...this.products[0] };
      this.grandTotal = this.cartService.getTotalPrice();
      
    })

  }

  removeItem(item, price){
    this.grandTotal -= price
this.cartService.removeCartItem(item)
  }

  emptyCart(){
    this.cartService.removeAllCart()
  }

}
