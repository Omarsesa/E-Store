import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-bestseller',
  templateUrl: './bestseller.component.html',
  styleUrls: ['./bestseller.component.css']
})
export class BestsellerComponent implements OnInit {
  bestsellers: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadBestsellers();
  }

  loadBestsellers() {
    this.productService.getBestsellers().subscribe(
      (data: any[]) => {
        this.bestsellers = data;
      },
      (error) => {
        console.error('Error fetching bestsellers:', error);
      }
    );
  }
}


