import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carts: { [key: string]: any[] } = {}; // Store carts by username
  private currentUser: string = '';

  constructor() {}

  setCurrentUser(username: string) {
    this.currentUser = username;
    if (!this.carts[username]) {
      this.carts[username] = []; // Initialize the cart for the user if it doesn't exist
    }
  }

  addToCart(product: any) {
    const userCart = this.carts[this.currentUser];
    const existingProduct = userCart.find(item => item.product.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product exists
    } else {
      userCart.push({ product, quantity: 1 });
    }
  }

  getCartItems() {
    return this.carts[this.currentUser] || []; // Return the current user's cart
  }

  removeFromCart(product: any) {
    const userCart = this.carts[this.currentUser];
    this.carts[this.currentUser] = userCart.filter(item => item.product.name !== product.name);
  }

  clearCart() {
    this.carts[this.currentUser] = []; // Clear the user's cart
  }
}
