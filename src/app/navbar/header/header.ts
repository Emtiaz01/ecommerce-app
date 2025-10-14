import { Component, inject, OnInit } from '@angular/core';
import { ProtectedClickDirective } from "../../directives/protected-click";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ProtectedClickDirective, TranslateModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  translateService = inject(TranslateService);
  
  languages = [
    { code: 'en', label: 'English' },
    { code: 'bn', label: 'বাংলা' }
  ];
  currentLang = 'en';
  currentLangLabel = 'English';
  isLangDropdownOpen = false;

  ngOnInit() {
    // Get saved language from localStorage or use default
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.currentLang = savedLang;
    this.currentLangLabel = this.languages.find(l => l.code === savedLang)?.label || 'English';
    
    // Set the language in translation service
    this.translateService.setDefaultLang('en');
    this.translateService.use(savedLang);
  }

  ShopNow(){
    // Add your shop now logic here
  }

  toggleLangDropdown() {
    this.isLangDropdownOpen = !this.isLangDropdownOpen;
  }

  changeLanguage(langCode: string) {
    this.currentLang = langCode;
    this.currentLangLabel = this.languages.find(l => l.code === langCode)?.label || 'English';
    this.isLangDropdownOpen = false;
    
    // Save language preference to localStorage
    localStorage.setItem('selectedLanguage', langCode);
    
    // Change language for the entire application
    this.translateService.use(langCode);
  } 
}