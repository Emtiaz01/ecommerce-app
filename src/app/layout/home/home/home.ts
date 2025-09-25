import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from "../banner/banner";
import { FlashSales } from "../flash-sales/flash-sales";
import { CategoryBrowser } from "../category-browser/category-browser";
import { TopRatedProducts } from "../top-rated-products/top-rated-products";
import { Categories } from "../categories/categories";
import { ExploreProduct } from "../explore-product/explore-product";
import { NewArrival } from "../new-arrival/new-arrival";
import { Supports } from "../supports/supports";
import { Toparrow } from "../../../toparrow/toparrow";
import { AuthService } from '../../../services/auth.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule, Banner, FlashSales, CategoryBrowser, TopRatedProducts, Categories, ExploreProduct, NewArrival, Supports, Toparrow],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  authService = inject(AuthService);
  loading = signal(true);

  ngOnInit() {
    // Simulate a loading delay
    setTimeout(() => {
      this.loading.set(false);
    }, 2000); // 2 seconds delay
  }
}
