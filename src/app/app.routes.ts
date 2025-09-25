import { Routes } from '@angular/router';
import { Error } from './pages/error/error';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/home/home/home').then(m => m.Home) }, 
  { path: 'registration', loadComponent: () => import('./pages/registration/registration').then(m => m.Registration) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist').then(m => m.Wishlist) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then(m => m.Contact) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetails) },
  { path: 'billing', loadComponent: () => import('./pages/billing-details/billing-details').then(m => m.BillingDetails) },
  { path: 'account', loadComponent: () => import('./pages/account/account').then(m => m.Account) },
  { path: '**', component: Error } 
];
