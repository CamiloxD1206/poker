import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { RoomService } from '../../services/roomService/room.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  @Output() roomIdChanged = new EventEmitter<string>();
  @Output() validationStatus = new EventEmitter<boolean>();
  @Output() userJoined = new EventEmitter<string>();
  message: string = "continuar";
  userName: string = "";
  rolPlayer: string = "jugador";
  roomId: string = "";
  textButton: string = "Continuar";
  errorMessages: string[] = [];
  isButtonDisabled: boolean = true;

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.roomId = params['_id'];
      console.log('Valor de roomId:', this.roomId);
    });
  }

  receiveduserName(userName: string) {
    this.userName = userName;
    this.validateAndEnableButton();
  }

  validateAndEnableButton() {
    this.validateName();
    this.isButtonDisabled = !this.userName.trim() || this.errorMessages.length > 0 || !this.rolPlayer;
  }

  validateName() {
    this.errorMessages = [];
    if (this.userName.length < 5) {
      this.errorMessages.push("El nombre debe tener al menos 5 caracteres.");
    }
    if (this.userName.length > 20) {
      this.errorMessages.push("El nombre no puede tener más de 20 caracteres.");
    }
    if (!/^[a-zA-Z0-9\s"]*$/.test(this.userName)) {
      this.errorMessages.push("El nombre no puede contener caracteres especiales.");
    }
    const numCount = (this.userName.match(/\d/g) || []).length;
    if (numCount > 3) {
      this.errorMessages.push("El nombre no puede contener más de tres números.");
    }
  }

  handleButtonClick() {
    if (this.rolPlayer) {
      this.sendUserName();
    } else {
      this.errorMessages.push("debes escoger un modo de juego 'jugador' o 'espectador' ");
    }
  }

  sendUserName() {
    const trimmedUserName = this.userName.trim();
    this.userService.createUser(trimmedUserName, this.rolPlayer.toLowerCase()).subscribe(
      (response: any) => {
        console.log('Usuario creado:', response);
        alert(`el usuario ${this.userName} ha sido creado`);
        this.userService.setUserId(response.id);
        console.log('ID del usuario:', this.userService.getUserId());
        console.log(`ID de la sala: ${this.roomId}`);
        this.userService.loginUser(trimmedUserName).subscribe(
          (loginResponse: any) => {
            alert(`Usuario logueado con éxito. ID del usuario: ${this.userService.getUserId()}, ID de la sala: ${this.roomId}`);
            this.joinRoom();
          },
          (error: any) => {
            console.error('Error al iniciar sesión:', error);
          }
        );
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  joinRoom() {
    this.roomService.joinRoom(this.roomId).subscribe(
      (response: any) => {
        console.log('Unido a la sala exitosamente:', response);
        this.roomIdChanged.emit(this.roomId);
        this.validationStatus.emit(true);
        this.userJoined.emit(this.userName);
      },
      (error: any) => {
        console.error('Error al unirse a la sala:', error);
      }
    );
  }
}
