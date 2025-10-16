import { Component } from '@angular/core';

@Component({
  selector: 'app-toparrow',
  imports: [],
  templateUrl: './toparrow.html',
  styleUrl: './toparrow.scss'
})
export class Toparrow {
   scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
