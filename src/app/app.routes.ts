import { Routes } from '@angular/router';
import { Error } from './layout/error/error';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/home/home/home').then(m => m.Home) }, 
  { path: 'registration', loadChildren: () => import('./auth/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'about', loadComponent: () => import('./layout/about/about').then(m => m.About) },
  { path: 'wishlist', loadChildren: () => import('./layout/wishlist/wishlist.module').then(m => m.WishlistModule) },
  { 
    path: 'cart', 
    loadChildren: () => import('./layout/cart/cart.module').then(m => m.CartModule) 
  },
  { path: 'contact', loadComponent: () => import('./layout/contact/contact').then(m => m.Contact) },
  { 
    path: 'category/:categoryName', 
    loadComponent: () => import('./layout/home/category-products/category-products').then(m => m.CategoryProducts) 
  },
  { path: 'product/:id', loadChildren: () => import('./layout/product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'account', loadChildren: () => import('./layout/account/account.module').then(m => m.AccountModule) },
  { path: '**', loadComponent: () => import('./layout/error/error').then(m => m.Error) } 
];
