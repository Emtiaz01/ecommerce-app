import { Directive, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[protectedClick]',
  standalone: true,
})
export class ProtectedClickDirective {

  @Input('protectedClick') action: () => void = () => {};

  private authService = inject(AuthService);
  private router = inject(Router);

  @HostListener('click')
  onClick(): void {
    if (this.authService.currentUser()) {
      this.action();
    } else {
      alert('Please log in.');
      this.router.navigate(['/login']);
    }
  }
}
