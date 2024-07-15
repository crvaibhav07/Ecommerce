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
      console.log(this.products);
      
    })

  }

  removeItem(item){
this.cartService.removeCartItem(item)
  }

  emptyCart(){
    this.cartService.removeAllCart()
  }


  // updateItem(n) {
  //   this.cartService.updateCartItem(this.updatedItem.id, n).subscribe(response => {
  //     console.log('Item updated successfully', response);
  //     // Optionally, handle the response or update UI
  //   });
  // }
}
