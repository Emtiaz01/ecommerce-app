import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Registration } from './registration';
import { REGISTRATION_ROUTES } from './registration.routes';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    Registration,
    RouterModule.forChild(REGISTRATION_ROUTES)
  ]
})
export class RegistrationModule { }
