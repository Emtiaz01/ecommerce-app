import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from './contact';
import { CONTACT_ROUTES } from './contact.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Contact,
    RouterModule.forChild(CONTACT_ROUTES)
  ]
})
export class ContactModule { }
