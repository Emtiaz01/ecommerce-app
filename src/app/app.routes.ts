import { Routes } from '@angular/router';
import { Error } from './layout/error/error';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./layout/home/home/home').then(m => m.Home) }, 
  { path: 'registration', loadChildren: () => import('./auth/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'about', loadChildren: () => import('./layout/about/about.module').then(m => m.AboutModule) },
  { path: 'wishlist', loadChildren: () => import('./layout/wishlist/wishlist.module').then(m => m.WishlistModule) },
  { 
    path: 'cart', 
    loadChildren: () => import('./layout/cart/cart.module').then(m => m.CartModule) 
  },
  { path: 'contact', loadChildren: () => import('./layout/contact/contact.module').then(m => m.ContactModule) },
  { path: 'product/:id', loadChildren: () => import('./layout/product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'account', loadChildren: () => import('./layout/account/account.module').then(m => m.AccountModule) },
  { path: '**', component: Error } 
];
