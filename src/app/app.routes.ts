import { Routes } from '@angular/router';
import { Registration } from './registration/registration';
import { Home } from './layout/home/home/home'; 
import { Login } from './login/login';

export const routes: Routes = [
  // 1. Set the Home component as the default page for the base URL
  { path: '', component: Home }, 

  // 2. Define the other routes for direct navigation
  { path: 'registration', component: Registration },
  { path: 'login', component: Login }
];
