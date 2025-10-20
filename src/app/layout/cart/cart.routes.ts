import { Routes } from '@angular/router';
import { Cart } from './cart';
import { BillingDetails } from './billing-details/billing-details';

export const CART_ROUTES: Routes = [
  { path: '', component: Cart },
  { path: 'billing', component: BillingDetails }
];
