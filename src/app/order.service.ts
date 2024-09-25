import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders'; // Your endpoint for saving orders

  constructor(private http: HttpClient) {}

  // Ensure this method is defined
  saveOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
}
