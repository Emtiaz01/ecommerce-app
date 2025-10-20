import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Wishlist } from './wishlist';
import { WISHLIST_ROUTES } from './wishlist.routes';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    NgxSkeletonLoaderModule,
    Wishlist,
    RouterModule.forChild(WISHLIST_ROUTES)
  ]
})
export class WishlistModule { }
