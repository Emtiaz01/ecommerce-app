import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-arrival',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './new-arrival.html',
  styleUrls: ['./new-arrival.scss']
})
export class NewArrival {
  cards = [
    {
      title: 'PlayStation 5',
      description: 'Black and White version of the PS5 coming out on sale.',
      image: 'assets/images/ps5.png', 
    },
    {
      title: 'Women’s Collections',
      description: 'Featured woman collections that give you another vibe.',
      image: 'assets/images/womens collection.png',
    },
    {
      title: 'Speakers',
      description: "Amazon wireless speakers.",
      image: 'assets/images/speaker.png', 
    },
    {
      title: 'Perfume',
      description: "GUCCI INTENSE OUD EDP",
      image: 'assets/images/perfume.png', 
    }
  ];
}
