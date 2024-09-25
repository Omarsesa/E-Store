import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(success => {
      if (success) {
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Invalid username or password.';
        this.successMessage = '';
      }
    }, error => {
      this.errorMessage = 'An error occurred. Please try again.';
      this.successMessage = '';
    });
  }
}
