import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: any[] = [];
  productForm: any = {};
  editingProductId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(data => {
      this.products = data;
    });
  }

  addProduct() {
    this.http.post('http://localhost:3000/products', this.productForm).subscribe(() => {
      this.getProducts();
      this.productForm = {};
    });
  }

  editProduct(product: any) {
    this.editingProductId = product.id;
    this.productForm = { ...product };
  }

  updateProduct() {
    if (this.editingProductId) {
      this.http.put(`http://localhost:3000/products/${this.editingProductId}`, this.productForm).subscribe(() => {
        this.getProducts();
        this.productForm = {};
        this.editingProductId = null;
      });
    }
  }

  deleteProduct(productId: string) {
    this.http.delete(`http://localhost:3000/products/${productId}`).subscribe(() => {
      this.getProducts();
    });
  }

  canEditProducts() {
    // Implement your logic to determine if the user can edit products
    return true; // Example
  }

  canDeleteProducts() {
    // Implement your logic to determine if the user can delete products
    return true; // Example
  }
}
