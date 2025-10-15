import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  // Import ReactiveFormsModule for form handling
  imports: [CommonModule, ReactiveFormsModule, RouterLink, TranslateModule, NgOptimizedImage], 
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  private fb = inject(FormBuilder);
  contactForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  // This method will be called when the form is submitted
  sendMessage(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
      // Here you would typically send the data to a backend service
      alert('Message sent successfully!');
      this.contactForm.reset();
    } else {
      // Mark all fields as touched to show validation errors
      this.contactForm.markAllAsTouched();
    }
  }
}
