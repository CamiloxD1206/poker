import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() shareableLink: string = '';
  @Output() closeOverlay = new EventEmitter<void>();

  copyToClipboard() {
    const inputElement = document.querySelector(
      '.link__input'
    ) as HTMLInputElement;
    if (inputElement && inputElement.value) {
      inputElement.select();
      document.execCommand('copy');
      this.closeOverlay.emit();
    }
  }

  onCloseOverlay() {
    this.closeOverlay.emit();
  }
}
