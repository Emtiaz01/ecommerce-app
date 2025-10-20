import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login } from './login';
import { LOGIN_ROUTES } from './login.routes';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    Login,
    RouterModule.forChild(LOGIN_ROUTES)
  ]
})
export class LoginModule { }
