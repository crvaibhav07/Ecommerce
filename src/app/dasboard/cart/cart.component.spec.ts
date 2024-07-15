import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CartComponent } from './cart.component';

import { of } from 'rxjs';
import { CartService } from '../../cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [ CartService,
        provideHttpClient(), // Provide the HttpClient along with HttpClientTesting
        provideHttpClientTesting(),
       ] // Provide the real CartService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService); 
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should fetch products and calculate grand total on ngOnInit', () => {
    // Mock data for products
    const mockProducts: Product[] = [
      { 
        id: 1, 
        title: 'Product 1', 
        price: 10, 
        description: 'Description of Product 1', 
        category: 'Category 1', 
        image: 'product1.jpg' 
      },
      { 
        id: 2, 
        title: 'Product 2', 
        price: 20, 
        description: 'Description of Product 2', 
        category: 'Category 2', 
        image: 'product2.jpg' 
      },
      { 
        id: 3, 
        title: 'Product 3', 
        price: 30, 
        description: 'Description of Product 3', 
        category: 'Category 3', 
        image: 'product3.jpg' 
      }
    ];

    spyOn(cartService, 'getProduct').and.returnValue(of(mockProducts));
    spyOn(cartService, 'getTotalPrice').and.returnValue(60); // Mock getTotalPrice()

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that products are set correctly
    expect(component.products).toEqual(mockProducts);

    // Check that grandTotal is calculated correctly
    expect(component.grandTotal).toEqual(60);
  });

  it('should remove item from cartItemList', () => {
    // Mock data for cartItemList
    cartService.cartItemList = [
      { 
        id: 1, 
        title: 'Product 1', 
        price: 10, 
        description: 'Description of Product 1', 
        category: 'Category 1', 
        image: 'product1.jpg' 
      },
      { 
        id: 2, 
        title: 'Product 2', 
        price: 20, 
        description: 'Description of Product 2', 
        category: 'Category 2', 
        image: 'product2.jpg' 
      }
    ];

    // Product to remove 
    const productToRemove: Product = { 
      id: 1, 
      title: 'Product 1', 
      price: 10, 
      description: 'Description of Product 1', 
      category: 'Category 1', 
      image: 'product1.jpg' 
    };

    // Call the method to remove the product
    cartService.removeCartItem(productToRemove);

    
    expect(cartService.cartItemList.length).toBe(1);
    expect(cartService.cartItemList.some(item => item.id === productToRemove.id)).toBeFalse();
  });

  it('should not remove item if product id does not exist in cartItemList', () => {
    // Mock data for cartItemList
    cartService.cartItemList = [
      { 
        id: 1, 
        title: 'Product 1', 
        price: 10, 
        description: 'Description of Product 1', 
        category: 'Category 1', 
        image: 'product1.jpg' 
      },
      { 
        id: 2, 
        title: 'Product 2', 
        price: 20, 
        description: 'Description of Product 2', 
        category: 'Category 2', 
        image: 'product2.jpg' 
      }
    ];

    // Product with id 3 (not in cartItemList)
    const productNotInCart: Product = { 
      id: 3, 
      title: 'Product 3', 
      price: 30, 
      description: 'Description of Product 3', 
      category: 'Category 3', 
      image: 'product3.jpg' 
    };

    // Call the method to remove the product
    cartService.removeCartItem(productNotInCart);

    // Assert that no item was removed
    expect(cartService.cartItemList.length).toBe(2);
  });

  it('should call removeAllCart() from CartService', () => {
    // Spy on removeAllCart method 
    spyOn(cartService, 'removeAllCart').and.callThrough();

    // Call the component method
    component.emptyCart();

    expect(cartService.removeAllCart).toHaveBeenCalled();
  });
});
