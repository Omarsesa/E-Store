import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  products: any[] = [];
  bestsellers: any[] = [];
  newProduct: any = { name: '', description: '', price: 0, imageUrl: '' };
  newBestseller: any = { name: '', description: '', price: 0, imageUrl: '' };
  currentUserRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUserRole = this.authService.getRole();

    // Load users
    this.authService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: err => {
        console.error('Error loading users', err);
      }
    });

    // Load products
    this.authService.getProducts().subscribe({
      next: (products: any[]) => {
        this.products = products.map(product => ({ ...product, isEditing: false }));
      },
      error: err => {
        console.error('Error loading products', err);
      }
    });

    // Load bestsellers
    this.authService.getBestsellers().subscribe({
      next: (bestsellers: any[]) => {
        this.bestsellers = bestsellers.map(bestseller => ({ ...bestseller, isEditing: false }));
      },
      error: err => {
        console.error('Error loading bestsellers', err);
      }
    });
  }

  // Change user role
  changeUserRole(userId: number, newRole: string) {
    this.authService.updateUserRole(userId, newRole).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    });
  }

  // Delete user
  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe({
      next: () => this.ngOnInit(),
      error: err => console.error(err)
    });
  }

  // Add new product
  addProduct() {
    this.authService.addItem(this.newProduct, true).subscribe({
      next: () => {
        this.ngOnInit();
        this.newProduct = { name: '', description: '', price: 0, imageUrl: '' }; // Reset form
      },
      error: err => console.error(err)
    });
  }

  // Toggle edit mode for product
  toggleEditProduct(product: any) {
    product.isEditing = !product.isEditing;
  }

  // Save updated product
  saveProduct(product: any) {
    this.authService.editItem(product.id, product, true).subscribe({
      next: () => {
        product.isEditing = false; // Exit edit mode
      },
      error: err => console.error(err)
    });
  }

  // Delete product
  deleteProduct(productId: number) {
    this.authService.deleteItem(productId, true).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== productId);
      },
      error: err => console.error('Error deleting product', err)
    });
  }

  // Add new bestseller
  addBestseller() {
    this.authService.addItem(this.newBestseller, false).subscribe({
      next: () => {
        this.ngOnInit();
        this.newBestseller = { name: '', description: '', price: 0, imageUrl: '' }; // Reset form
      },
      error: err => console.error(err)
    });
  }

  // Toggle edit mode for bestseller
  toggleEditBestseller(bestseller: any) {
    bestseller.isEditing = !bestseller.isEditing;
  }

  // Save updated bestseller
  saveBestseller(bestseller: any) {
    this.authService.editItem(bestseller.id, bestseller, false).subscribe({
      next: () => {
        bestseller.isEditing = false; // Exit edit mode
      },
      error: err => console.error(err)
    });
  }

  // Delete bestseller
  deleteBestseller(bestsellerId: number) {
    this.authService.deleteItem(bestsellerId, false).subscribe({
      next: () => {
        this.bestsellers = this.bestsellers.filter(bestseller => bestseller.id !== bestsellerId);
      },
      error: err => console.error('Error deleting bestseller', err)
    });
  }

  // Utility methods to check role-based permissions
  canEditRoles(): boolean {
    return this.currentUserRole === 'Admin';
  }

  canDeleteUsers(): boolean {
    return this.currentUserRole === 'Admin' || this.currentUserRole === 'Assistant';
  }

  canManageProducts(): boolean {
    return this.currentUserRole === 'Admin' || this.currentUserRole === 'Assistant';
  }
}
