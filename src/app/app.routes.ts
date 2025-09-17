import { Routes } from '@angular/router';
import { Registration } from './pages/registration/registration';
import { Home } from './layout/home/home/home'; 
import { Login } from './pages/login/login';
import { About } from './pages/about/about';
import { Wishlist } from './pages/wishlist/wishlist';
import { Cart } from './pages/cart/cart';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'registration', component: Registration },
  { path: 'login', component: Login },
  { path: 'about', component: About},
  { path: 'wishlist', component: Wishlist},
  { path: 'cart', component: Cart},
  { path: 'contact', component: Contact}
];
