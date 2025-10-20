import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartDirective } from './directives/add-to-cart';
import { AddToWishlistDirective } from './directives/add-to-wishlist';
import { ProtectedClickDirective } from './directives/protected-click';

@NgModule({
  imports: [
    CommonModule,
    AddToCartDirective,
    AddToWishlistDirective,
    ProtectedClickDirective,
  ],
  exports: [
    AddToCartDirective,
    AddToWishlistDirective,
    ProtectedClickDirective,
  ]
})
export class SharedModule { }
