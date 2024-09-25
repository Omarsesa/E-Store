import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CartService } from '../../app/cart.service'; // Import CartService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private apiUrlUsers = 'http://localhost:3000/users'; 
  private apiUrl = 'http://localhost:3000'; // json-server URL
  private apiUrlProducts = 'http://localhost:3000/products'; 
  private apiUrlBestsellers = 'http://localhost:3000/bestseller'; 

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {}

  login(credentials: any): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrlUsers}?username=${credentials.username}&password=${credentials.password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem(this.tokenKey, JSON.stringify({ username: user.username, role: user.role }));
          this.cartService.setCurrentUser(user.username); // Set current user in CartService
          this.router.navigate(['/dashboard']);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  signup(data: any): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrlUsers).pipe(
      map(users => {
        const highestId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
        return highestId + 1;
      }),
      switchMap(nextId => {
        const newUser = { id: nextId, username: data.username, password: data.password, role: 'User' };
        return this.http.post(this.apiUrlUsers, newUser).pipe(
          map(() => true),
          catchError(error => {
            console.error('Signup error', error);
            return of(false);
          })
        );
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey) || '{}');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token.username;
  }

  getRole(): string {
    const token = this.getToken();
    return token.role || '';
  }

  getUsername(): string {
    const token = this.getToken();
    return token.username || '';
  }

  isAdminOrAssistant(): boolean {
    const role = this.getRole();
    return role === 'Admin' || role === 'Assistant';
  }

  // Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsers);
  }

  // Update user role
  updateUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.patch(`${this.apiUrlUsers}/${userId}`, { role: newRole });
  }

  // Delete user
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlUsers}/${userId}`);
  }

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProducts);
  }

  addItem(item: any, isProduct: boolean): Observable<any> {
    const url = isProduct ? `${this.apiUrl}/products` : `${this.apiUrl}/bestsellers`;
    return this.http.post(url, item);
  }

  editItem(itemId: number, item: any, isProduct: boolean): Observable<any> {
    const url = isProduct ? `${this.apiUrl}/products/${itemId}` : `${this.apiUrl}/bestsellers/${itemId}`;
    return this.http.put(url, item);
  }

  deleteItem(itemId: number, isProduct: boolean): Observable<any> {
    const url = isProduct ? `${this.apiUrl}/products/${itemId}` : `${this.apiUrl}/bestsellers/${itemId}`;
    return this.http.delete(url);
  }

  // Get all bestsellers
  getBestsellers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlBestsellers);
  }
}
