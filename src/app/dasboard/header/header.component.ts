import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../products.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { Product } from '../../model/product/product.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  totalItems: number = 0;
  searchTerm = ''
  // products: Product[] = [];

constructor(private productService:ProductsService, private authService:AuthService, private router: Router, private cartService: CartService){}

ngOnInit():void{
}

  filterProducts(event:any): void {
    let categorySelected = event.target.value
    this.productService.category.next(categorySelected)
    
  }

  search(){
    this.productService.search.next(this.searchTerm);
  }

  logout(){
this.authService.logout();
this.router.navigate(['/login']);

  }
}
