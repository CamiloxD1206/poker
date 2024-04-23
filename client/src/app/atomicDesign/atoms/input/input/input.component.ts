import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Output() inputValue = new EventEmitter<string>();



  onInputChange(value: string) {
    this.inputValue.emit(value);

  }
}
