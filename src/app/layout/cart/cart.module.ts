import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from './cart';
import { CART_ROUTES } from '../cart/cart.routes';
import { BillingDetails } from './billing-details/billing-details';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    Cart,
    BillingDetails,
    RouterModule.forChild(CART_ROUTES)
  ]
})
export class CartModule { }
