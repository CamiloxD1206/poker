import { Component, EventEmitter,Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss'],
})
export class CardsContainerComponent implements OnInit {
  specialNumbers: (number | string)[] = [
    0,
    1,
    3,
    5,
    8,
    13,
    21,
    34,
    55,
    89,
    '?',
    '☕',
  ];
  selectedCard: any = null;
  userId: string = '';

  @Output() cardSelected = new EventEmitter<{ card: any; userId: string }>();
  ngOnInit() {
    const savedCard = localStorage.getItem('selectedCard');
    if (savedCard) {
      this.selectedCard = JSON.parse(savedCard);
    }

    this.userId = localStorage.getItem('userId') || '';
  }

  onCardSelect(cardValue: any) {
    if (cardValue !== this.selectedCard) {
      this.selectedCard = cardValue;
      console.log(
        'Emitiendo evento cardSelected con valor:',
        this.selectedCard
      );
      this.cardSelected.emit({ card: this.selectedCard, userId: this.userId });
    } else if (this.selectedCard === null) {
      this.selectedCard = cardValue;
      console.log('Seleccionando carta:', this.selectedCard);
      this.cardSelected.emit({ card: this.selectedCard, userId: this.userId });
    }

    localStorage.setItem('selectedCard', JSON.stringify(this.selectedCard));

  }
}
