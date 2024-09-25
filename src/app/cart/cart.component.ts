import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  shippingCost: number = 50; // Define a default shipping cost

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Initialize with the current user's cart items
  }

  removeItem(product: any) {
    this.cartService.removeFromCart(product);
    this.updateCartItems(); // Update the cart items after removing an item
  }

  getSubtotal() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getTotal() {
    return this.getSubtotal() + this.shippingCost; // Include shipping cost in total
  }

  clearCart() {
    this.cartService.clearCart();
    this.updateCartItems(); // Update the cart items after clearing
  }

  proceedToCheckout() {
    const orderData = {
      items: this.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
      })),
      total: this.getTotal(),
    };

    this.orderService.saveOrder(orderData).subscribe(
      response => {
        console.log('Order saved successfully:', response);
        this.clearCart(); // Clear the cart after successful order
      },
      error => {
        console.error('Error saving order:', error);
      }
    );
  }

  // Method to update cart items after any change
  private updateCartItems() {
    this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
  }
}
