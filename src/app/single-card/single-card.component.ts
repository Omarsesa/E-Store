import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';  // Import the CartService

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css']
})
export class SingleCardComponent {

  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() imageUrl!: string;

  constructor(private cartService: CartService) {}  // Inject the CartService

  // Method to add the product to the cart
  addToCart() {
    const product = {
      name: this.name,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl
    };
    this.cartService.addToCart(product);
  }
}
