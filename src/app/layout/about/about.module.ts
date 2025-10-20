import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { About } from './about';
import { ABOUT_ROUTES } from './about.routes';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    About,
    RouterModule.forChild(ABOUT_ROUTES)
  ]
})
export class AboutModule { }
