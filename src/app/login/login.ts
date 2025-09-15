import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';
import { AuthService } from '../services/auth.service'; // Ensure this path is correct

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
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

      // --- CRITICAL DEBUGGING STEP ---
      console.log('AuthService.login() returned:', isLoggedIn);

      if (isLoggedIn) {
        this.router.navigate(['/']); // Navigate to home page
      } else {
        // This is the most likely path being taken
        alert('Invalid username or password.');
        console.error('Login failed. The username or password did not match.');
      }
    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
      alert('A critical error occurred. Please check the console.');
    }
  }
}