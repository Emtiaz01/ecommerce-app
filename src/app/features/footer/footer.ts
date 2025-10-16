import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {

  accountLinks = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];
  quickLinks = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];

  socialLinks = [
    { name: 'Facebook', iconUrl: 'assets/icons/facebook.png' }, 
    { name: 'Twitter', iconUrl: 'assets/icons/twitter.png' },   
    { name: 'Instagram', iconUrl: 'assets/icons/instagram.png' },
    { name: 'LinkedIn', iconUrl: 'assets/icons/linkedin.png' }  
  ];
}
