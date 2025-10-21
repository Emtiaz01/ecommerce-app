import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/guards/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  async onLogin(form: NgForm) {
    if (form.invalid) {
      alert('Form is invalid.');
      return;
    }

    const { username, password } = form.value;
    console.log(`Attempting to log in user: '${username}' with password: '${password}'`);

    try {
      const isLoggedIn = await this.authService.login(username, password);
      console.log('AuthService.login() returned:', isLoggedIn);

      if (isLoggedIn) {
        this.router.navigate(['/'], { replaceUrl: true });
      } else {
        alert('Invalid username or password.');
        console.error('Login failed. The username or password did not match.');
      }
    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
      alert('A critical error occurred. Please check the console.');
    }
  }
}