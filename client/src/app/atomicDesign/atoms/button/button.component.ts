import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() additionalClass: string = '';
  @Input() buttonValue: string = '';
  @Input() isDisabled: boolean = true;

  handleClick() {
    this.buttonClick.emit();
  }
}
