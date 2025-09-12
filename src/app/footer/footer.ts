import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  // Data for the navigation columns
  accountLinks = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];
  quickLinks = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];

  // Data for social media icons
  socialLinks = [
    { name: 'Facebook', iconUrl: 'assets/icons/facebook.png' }, 
    { name: 'Twitter', iconUrl: 'assets/icons/twitter.png' },   
    { name: 'Instagram', iconUrl: 'assets/icons/instagram.png' },
    { name: 'LinkedIn', iconUrl: 'assets/icons/linkedin.png' }  
  ];


  // scrollToTop(): void {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // }
}
