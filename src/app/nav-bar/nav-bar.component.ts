import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  showSearchBar = false;
  searchQuery = '';
  showPopup = false;
  matchingProduct: any = null;
  isDarkMode = false;
  matchingProducts: any[] = [];

  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) {}

  logout() {
    this.authService.logout();
  }

  toggleSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.closePopup();
    }
  }

  search() {
    if (this.searchQuery.trim()) {
      this.productService.getProducts().subscribe(products => {
        this.matchingProducts = products.filter(product => 
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.showPopup = this.matchingProducts.length > 0;
      });
    } else {
      this.matchingProducts = [];
      this.showPopup = false;
    }
  }

  closePopup() {
    this.showPopup = false;
    this.matchingProduct = null;
    this.searchQuery = '';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }

  ngOnInit() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      this.isDarkMode = true;
      document.body.setAttribute('data-theme', 'dark');
    }
  }
}
