import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestsellerService {

  private apiUrl = 'http://localhost:3000/bestseller'; // JSON Server URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Returns the list of bestseller
  }
}
