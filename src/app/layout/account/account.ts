import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IndexedDBService } from '../../core/services/indexeddb.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-account',
  templateUrl: './account.html',
  styleUrls: ['./account.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxSkeletonLoaderModule]
})
export class Account implements OnInit {
  userForm!: FormGroup;
  currentUser: any;
  loading = true;

  constructor(private fb: FormBuilder, private indexedDBService: IndexedDBService, private apiService: ApiService) {}

  async ngOnInit() {
    // Simulate loading
    setTimeout(async () => {
      // Get logged-in user from localStorage
      const userJson = localStorage.getItem('currentUser');
      if (!userJson) {
        alert('No logged-in user found.');
        this.loading = false;
        return;
      }

      this.currentUser = JSON.parse(userJson);

      // Validate user presence (optional: fetch fresh from IDB if needed)
      if (!this.currentUser || !this.currentUser.username) {
        alert('Logged-in user info missing.');
        this.loading = false;
        return;
      }

      // Create form pre-filled with user data
      this.userForm = this.fb.group({
        firstName: [this.currentUser.name || '', Validators.required],
        lastName: ['', Validators.required], // If you have a lastName field, set it; else keep blank
        email: [{ value: this.currentUser.email || '', disabled: true }, [Validators.required, Validators.email]],
        address: [this.currentUser.address || ''],
        currentPassword: [''],
        newPassword: [''],
        confirmPassword: ['']
      });

      this.loading = false;
    }, 1500); // 1.5 second delay
  }

  onSaveChanges(): void {
    if (this.userForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    // Update currentUser info (add more fields if needed)
    Object.assign(this.currentUser, {
      name: this.userForm.value.firstName,
      address: this.userForm.value.address
    });

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.indexedDBService.addUser(this.currentUser).then(() => {
      alert('Profile updated!');
    }).catch(err => {
      alert('Failed to update profile!');
      console.error(err);
    });
  }

  onCancel(): void {
    // Reset form to current user data
    this.userForm.patchValue({
      firstName: this.currentUser?.name || '',
      lastName: '',
      email: this.currentUser?.email || '',
      address: this.currentUser?.address || ''
    });
  }
}
