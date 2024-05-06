import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  iconPragma: string = "./../../../assets/img/pragmalogo.png";
  @Input() roomId: string = "";
  @Input() roomName: string = "";
  @Output() openOverlay = new EventEmitter<void>();
  @Output() showUserList = new EventEmitter<void>();
  additionalClass:string=""

  constructor() {}

  openInvitePlayersOverlay() {
    console.log("Invitar jugadores clickeado");
    this.openOverlay.emit();
  }

  showUserListOverlay() {
    this.showUserList.emit();
  }

}
