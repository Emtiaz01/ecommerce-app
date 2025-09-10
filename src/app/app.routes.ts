import { Routes } from '@angular/router';
import { Header } from './layout/home/header/header';
import { Header2 } from './layout/home/header2/header2';
import { Banner } from './layout/home/banner/banner';
export const routes: Routes = [
  { path: 'app-header', component: Header },
  { path: 'app-header2', component: Header2 },
  {path: 'app-hero', component: Banner}
];
