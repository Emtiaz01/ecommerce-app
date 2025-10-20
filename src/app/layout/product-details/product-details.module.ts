import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductDetails } from './product-details';
import { PRODUCT_DETAILS_ROUTES } from './product-details.routes';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ProductDetails,
    RouterModule.forChild(PRODUCT_DETAILS_ROUTES)
  ]
})
export class ProductDetailsModule { }
