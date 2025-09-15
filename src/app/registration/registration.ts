import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service'; // Ensure this path is correct
import { User } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.scss']
})
export class Registration {

  constructor(
    private indexedDBService: IndexedDBService,
    private router: Router
  ) {}

  // The hashPassword method has been removed.

  async onSignup(form: NgForm) {
    console.log('Step 1: onSignup method started.');

    if (form.invalid) {
      console.error('EXIT POINT: Form is invalid. Stopping execution.');
      alert('Please ensure all required fields are filled out correctly.');
      return;
    }

    console.log('Step 2: Form is valid. Creating user object.');
    const newUser: User = form.value;

    try {
      console.log(`Step 3: Checking if user '${newUser.username}' already exists.`);
      const existingUser = await this.indexedDBService.getUserByUsername(newUser.username);

      if (existingUser) {
        console.error(`EXIT POINT: User '${newUser.username}' already exists. Stopping execution.`);
        alert('Username already exists. Please choose another.');
        return;
      }

      // --- REMOVED HASHING LOGIC ---
      // The newUser object is now used directly, containing the plain text password.

      console.log(`Step 4: User does not exist. Adding '${newUser.username}' to IndexedDB.`);
      // --- MODIFICATION: SAVE THE OBJECT WITH THE PLAIN TEXT PASSWORD ---
      await this.indexedDBService.addUser(newUser);

      console.log('Step 5: User added successfully.');
      form.reset();
      
      console.log('Step 6: Navigating to /login.');
      this.router.navigate(['/login']);

    } catch (error) {
      console.error('CRITICAL ERROR in try block:', error);
      alert('An error occurred during registration. Please check the console.');
    }
  }
}
