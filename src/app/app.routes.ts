import { Routes } from '@angular/router';
import { Error } from './layout/error/error';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/home/home/home').then(m => m.Home) }, 
  { path: 'registration', loadComponent: () => import('./auth/registration/registration').then(m => m.Registration) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: 'about', loadComponent: () => import('./layout/about/about').then(m => m.About) },
  { path: 'wishlist', loadComponent: () => import('./layout/wishlist/wishlist').then(m => m.Wishlist) },
  { path: 'cart', loadComponent: () => import('./layout/cart/cart').then(m => m.Cart) },
  { path: 'contact', loadComponent: () => import('./layout/contact/contact').then(m => m.Contact) },
  { path: 'product/:id', loadComponent: () => import('./layout/product-details/product-details').then(m => m.ProductDetails) },
  { path: 'billing', loadComponent: () => import('./layout/cart/billing-details/billing-details').then(m => m.BillingDetails) },
  { path: 'account', loadComponent: () => import('./layout/account/account').then(m => m.Account) },
  { path: '**', component: Error } 
];
