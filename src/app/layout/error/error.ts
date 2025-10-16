import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-404-error',
  templateUrl: './error.html',
  styleUrls: ['./error.scss']
})
export class Error {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
