import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/roomService/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {
  @Output() roomCreated = new EventEmitter<{ id: string, name: string }>();
  imgTitleUrl: string = "../../../../assets/img/pragmalogo.png";
  roomName: string = "";
  errorMessages: string[] = [];
  isButtonDisabled: boolean = true;

  constructor(private roomService: RoomService, private router: Router) {}

  receiveRoomName(roomName: string) {
    this.roomName = roomName;
    this.validateName();
  }

  validateName() {
    this.errorMessages = [];
    let isValid = true;

    if (this.roomName.length < 5) {
      this.errorMessages.push("El nombre debe tener al menos 5 caracteres.");
      isValid = false;
    }

    if (this.roomName.length > 20) {
      this.errorMessages.push("El nombre no puede tener más de 20 caracteres.");
      isValid = false;
    }

    if (!/^[a-zA-Z0-9\s"]*$/.test(this.roomName)) {
      this.errorMessages.push("El nombre no puede contener caracteres especiales.");
      isValid = false;
    }

    const numCount = (this.roomName.match(/\d/g) || []).length;
    if (numCount > 3) {
      this.errorMessages.push("El nombre no puede contener más de tres números.");
      isValid = false;
    }

    this.isButtonDisabled = !isValid || !this.roomName.trim();
  }

  handleButtonClick() {
    this.sendRoomName();
  }

  sendRoomName() {
    const trimmedRoomName = this.roomName.trim();
    this.roomService.createRoom(trimmedRoomName).subscribe(
      (response: any) => {
        console.log("Sala creada exitosamente:", response);
        if (response._id) {
          this.roomCreated.emit({ id: response._id, name: trimmedRoomName });
            this.router.navigate(['/table', response._id]);
        } else {
          console.error("El ID de la sala es indefinido.");
        }
      },
      (error: any) => {
        alert(`Error al crear la sala: Rectifica que el nombre cumpla con todas las validaciones que están en pantalla y este no contenga espacios en blanco`);
      }
    );
  }
}
