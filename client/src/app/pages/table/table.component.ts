import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Socket } from 'socket.io-client';
import { RoomService } from '../../services/roomService/room.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() roomIdChanged = new EventEmitter<string>();
  @Output() validationStatus = new EventEmitter<boolean>();
  @Output() roomNameChanged = new EventEmitter<string>();
  @Output() shareableLink = new EventEmitter<string>();
  showInvitePlayersOverlay: boolean = false;

  showCreateUserComponent = true;
  overlayValid = false;
  roomId: string = "";
  roomName: string = "";
  isAdmin:boolean=false
  userToken = '';
  isSpectator: boolean=false;
  joinedUsers: { name: string; isAdmin: boolean }[] = [];


  usersInRoomSubscription: Subscription | null = null;
  socket$: Socket;

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private roomService: RoomService,
  ) {
    this.socket$ = this.roomService.getSocket();

    this.route.params.subscribe(params => {
      this.roomId = params['_id'];
      this.roomIdChanged.emit(this.roomId);
      this.roomService.joinRoomWebSocket(this.roomId);
      this.getRoomInfo();
    });
  }

  ngOnInit() {
    this.userToken = this.cookieService.get('token');
    this.showCreateUserComponent = this.userToken === '';
    this.usersInRoomSubscription = this.roomService.getUsersInRoom(this.roomId).subscribe((users: string[]) => {
      this.joinedUsers = users.map((user, index) => ({ name: user, isAdmin: index === 0 }));}
  );

    this.roomService.newUserJoined.subscribe((users: string[]) => {
      console.log("New users joined:", users);
      this.handleNewUserJoined(users);
    });

    this.socket$.on('overlayValidationStatus', (valid: boolean) => {
      if (valid) {
        window.location.reload();
      }
    });

  }

  ngOnDestroy() {
    this.usersInRoomSubscription?.unsubscribe();
  }

  private getRoomInfo(): void {
    this.roomService.getRoomNameById(this.roomId).subscribe(
      name => {
        this.roomName = name;
        this.roomNameChanged.emit(this.roomName);
      },
      error => {
        console.error('Error al obtener la información de la sala:', error);
      }
    );
  }

  toggleOverlay() {
    this.showCreateUserComponent = !this.overlayValid;
    this.handleNewUserJoined([]);
  }

  receiveOverlayValidation(valid: boolean) {
    this.overlayValid = valid;
    this.showCreateUserComponent = !valid;
    this.roomService.notifyOverlayValidation(valid);
  }

  receiveRoomCreated(roomId: string) {
    this.roomId = roomId;
    this.roomIdChanged.emit(this.roomId);
    this.validationStatus.emit(true);
  }

  handleUserJoined(userName: string) {
    this.showCreateUserComponent = false;
    this.printWelcomeMessage(userName);
  }

  printWelcomeMessage(userName: string) {
    console.log(`¡Bienvenido/a ${userName}!`);
  }

  handleNewUserJoined(users: string[]) {
    if (users.length <= 8) {
      this.joinedUsers = users.map((user, index) => ({ name: user, isAdmin: index === 0 }));
    } else {
      alert("¡La sala está llena! No se pueden agregar más usuarios.");
    }
  }

  getShareableLink(): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}#/room/${this.roomId}`;
  }
  openInvitePlayersOverlay() {
    this.showInvitePlayersOverlay = true;
  }
}
