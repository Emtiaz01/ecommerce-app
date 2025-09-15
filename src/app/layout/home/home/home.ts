import { Component } from '@angular/core';
import { Header } from "../../../header/header";
import { Banner } from "../banner/banner";
import { FlashSales } from "../flash-sales/flash-sales";
import { CategoryBrowser } from "../category-browser/category-browser";
import { TopRatedProducts } from "../top-rated-products/top-rated-products";
import { Categories } from "../categories/categories";
import { ExploreProduct } from "../explore-product/explore-product";
import { NewArrival } from "../new-arrival/new-arrival";
import { Supports } from "../supports/supports";
import { Toparrow } from "../../../toparrow/toparrow";

@Component({
  selector: 'app-home',
  imports: [Banner, FlashSales, CategoryBrowser, TopRatedProducts, Categories, ExploreProduct, NewArrival, Supports, Toparrow],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
