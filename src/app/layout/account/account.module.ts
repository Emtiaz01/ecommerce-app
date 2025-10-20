import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Account } from './account';
import { ACCOUNT_ROUTES } from './account.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Account,
    RouterModule.forChild(ACCOUNT_ROUTES)
  ]
})
export class AccountModule { }
