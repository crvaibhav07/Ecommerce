import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../products.service';
import { CartService } from '../../cart.service';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  products: Product[] = [];
  categories: string[] = ['men\'s clothing', 'electronics', 'women\'s clothing', 'jewelery', 'none' ]; // List of all categories
  selectedCategories = '';
  // active = '';
  // totalItems: number = 0;
  searchKey:string = ''


  constructor(private http:HttpClient, private productService: ProductsService, private cartService:CartService, private authService:AuthService) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.productService.search.subscribe(res => {
      this.searchKey = res
    })

    this.productService.category.subscribe(res => {
      this.onCategoryChange(res)
    })
    
    this.products.forEach((a:Product) => {
      Object.assign(a,{quantity:1, total:a.price})
    })
    // this.cartService.getProduct().subscribe(res => {
    //   this.totalItems = res.length
    // })
  }

  fetchProducts(): void {
    if (this.selectedCategories ) {
      let category = this.selectedCategories
      this.getProducts(category)
          }
          else{
         this.getProducts()
          }
  }

  getProducts(category?:string){
    this.productService.getProducts(category)
          .subscribe((products: Product[]) => {
            this.products = products;

            this.products.forEach((a:Product)=>{
              Object.assign(a,{quantity:1, total: a.price})
            })
          });
  }


  onCategoryChange(category:string): void {
    if(category == 'none'){
      this.selectedCategories = ''
    }
    else{
      this.selectedCategories = category;
    }
    this.fetchProducts();
  }

  addToCart(product:Product){
this.cartService.addToCart(product);
  }

  incrementQuantity(product: Product): void {
    product.quantity++;
  }

  decrementQuantity(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
 
}



