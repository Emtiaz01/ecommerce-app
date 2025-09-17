import { Component } from '@angular/core';
import { ProtectedClickDirective } from "../../directives/protected-click";

@Component({
  selector: 'app-header',
  imports: [ProtectedClickDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  ShopNow(){
    
  }

}
