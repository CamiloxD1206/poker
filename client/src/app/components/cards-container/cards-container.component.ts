import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent {
  specialNumbers: (number | string)[] = [0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];
}
