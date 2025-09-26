import { Component, inject } from '@angular/core';
import { ProtectedClickDirective } from "../../directives/protected-click";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ProtectedClickDirective, TranslateModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  translateService = inject(TranslateService);
  ShopNow(){
    
  }
  languages = [
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' }
];
currentLang = 'en';
currentLangLabel = 'English';
isLangDropdownOpen = false;

toggleLangDropdown() {
  this.isLangDropdownOpen = !this.isLangDropdownOpen;
}

changeLanguage(langCode: string) {
  this.currentLang = langCode;
  this.currentLangLabel = this.languages.find(l => l.code === langCode)?.label || 'English';
  this.isLangDropdownOpen = false;
  this.translateService.use(langCode);
} 
}