import { Routes } from '@angular/router';
import { Header } from './layout/home/header/header';
import { Header2 } from './layout/home/header2/header2';
import { Banner } from './layout/home/banner/banner';
import { FlashSales } from './layout/home/flash-sales/flash-sales';
import { CategoryBrowser } from './layout/home/category-browser/category-browser';
import { TopRatedProducts } from './layout/home/top-rated-products/top-rated-products';
import { Categories } from './layout/home/categories/categories';
import { ExploreProduct } from './layout/home/explore-product/explore-product';
import { NewArrival } from './layout/home/new-arrival/new-arrival';
export const routes: Routes = [
  { path: 'app-header', component: Header },
  { path: 'app-header2', component: Header2 },
  {path: 'app-hero', component: Banner},
  {path: 'app-flash-sales', component: FlashSales},
  {path: 'app-category-browser', component: CategoryBrowser},
  {path: 'app-top-rated-products', component: TopRatedProducts},
  {path: 'app-categories', component: Categories},
  {path: 'app-explore-product', component: ExploreProduct},
  {path: 'app-new-arrival', component: NewArrival}
];
