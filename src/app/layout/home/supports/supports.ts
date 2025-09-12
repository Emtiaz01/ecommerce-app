import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supports.html',
  styleUrls: ['./supports.scss']
})
export class Supports {
  services = [
    {
      iconUrl: 'assets/icons/delivery-icon.png', 
      title: 'FREE AND FAST DELIVERY',
      description: 'Free delivery for all orders over $140'
    },
    {
      iconUrl: 'assets/icons/customer-service-icon.png', 
      title: '24/7 CUSTOMER SERVICE',
      description: 'Friendly 24/7 customer support'
    },
    {
      iconUrl: 'assets/icons/money-back-icon.png', 
      title: 'MONEY BACK GUARANTEE',
      description: 'We return money within 30 days'
    }
  ];
}
