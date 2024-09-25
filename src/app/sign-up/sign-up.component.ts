import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  newUser = {
    username: '',
    password: ''
  };
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  signUp(): void {
    if (this.newUser.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = '';
      return;
    }

    this.authService.signup(this.newUser).subscribe(success => {
      if (success) {
        this.successMessage = 'Sign-up successful!';
        this.errorMessage = '';
        this.newUser = { username: '', password: '' }; // Clear form
        this.confirmPassword = ''; // Clear confirm password
      } else {
        this.errorMessage = 'Username already exists or there was an error.';
        this.successMessage = '';
      }
    }, error => {
      this.errorMessage = 'An unexpected error occurred.';
      this.successMessage = '';
    });
  }
}
