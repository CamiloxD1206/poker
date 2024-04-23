import { Component } from '@angular/core';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss']
})
export class GameTableComponent {
  names: string[] = ['Nombre1', 'Nombre2', 'Nombre3', 'Nombre4', 'Nombre5'];
}
