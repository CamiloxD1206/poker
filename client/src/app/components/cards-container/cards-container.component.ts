import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent implements OnInit {
  specialNumbers: (number | string)[] = [0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕'];
  selectedCard: any = null;

  @Output() cardSelected = new EventEmitter<any>();

  ngOnInit() {

    const savedCard = localStorage.getItem('selectedCard');
    if (savedCard) {
      this.selectedCard = JSON.parse(savedCard);
    }
  }

  onCardSelect(cardValue: any) {
    if (cardValue !== this.selectedCard) {
      this.selectedCard = cardValue;
      console.log('Emitiendo evento cardSelected con valor:', this.selectedCard);
      this.cardSelected.emit(this.selectedCard);
    } else if (this.selectedCard === null) {
      this.selectedCard = cardValue;
      console.log('Seleccionando carta:', this.selectedCard);
      this.cardSelected.emit(this.selectedCard);
    }


    localStorage.setItem('selectedCard', JSON.stringify(this.selectedCard));
  }


}
