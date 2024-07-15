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
      console.log(category);
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
console.log(products);

            // ------------
            this.products.forEach((a:Product)=>{
              Object.assign(a,{quantity:1, total: a.price})
            })
          });
  }

  // callFromHeader(){
  //   console.log(this.active);
    
  //   this.authService.showSibling.subscribe(res => {
  //     this.active = res
  //   });

  //   console.log(this.active);
  //   if(this.active){
  //     this.onCategoryChange(this.active)
  //   }

    
  // }

  onCategoryChange(category:string): void {
    
    // if (event?.target?.checked && !this.selectedCategories.includes(category)) {
    //   this.selectedCategories.push(category);
    // } else {
    //   const index = this.selectedCategories.indexOf(category);
    //   if (index !== -1) {
    //     this.selectedCategories.splice(index, 1);
    //   }
    // }
    console.log('Selected Categories:', this.selectedCategories);
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

  // addItemToCart(product: Product) {
  //   const cartItem = {
  //     productId: product.id,
  //     quantity: 1 // Hardcoding for simplicity, you can make this dynamic based on user input
  //   };

  //   this.http.post('https://fakestoreapi.com/carts', cartItem)
  //     .subscribe(
  //       (response) => {
  //         console.log('Item added to cart:', response);
  //         // Optionally, you can handle success (e.g., show a success message)
  //       },
  //       (error) => {
  //         console.error('Error adding item to cart:', error);
  //         // Optionally, you can handle errors (e.g., show an error message)
  //       }
  //     );
  // }

 
}



