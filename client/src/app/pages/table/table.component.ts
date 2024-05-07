import { Component, EventEmitter, Output, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, forkJoin } from 'rxjs';
import { Socket } from 'socket.io-client';
import { RoomService } from '../../services/roomService/room.service';
import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  @Output() roomIdChanged = new EventEmitter<string>();
  @Output() validationStatus = new EventEmitter<boolean>();
  @Output() roomNameChanged = new EventEmitter<string>();
  @Output() shareableLink = new EventEmitter<string>();

  @ViewChild(CardsContainerComponent) cardsContainer!: CardsContainerComponent;

  showInvitePlayersOverlay = false;
  showCreateUserComponent = true;
  showUserListOverlay = false;
  overlayValid = false;
  roomId = '';
  roomName = '';
  userName = '';
  isAdmin = false;
  userToken = '';
  joinedUsers: {
    name: string;
    isAdmin: boolean;
    isSelected: boolean;
    area: string;
    score?: number;
  }[] = [];
  usersInRoomSubscription: Subscription | undefined;
  socket$: Socket;
  selectedCards: any[] = [];
  selectedCard: any;
  selectedCardsByUser: { [userName: string]: any } = {};
  private readonly areas: string[] = [
    'top-left',
    'top',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ];

  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private roomService: RoomService
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
    this.usersInRoomSubscription = this.roomService.getUsersInRoom(this.roomId).subscribe((users: { username: string; isAdmin: boolean; }[]) => {
      this.joinedUsers = users.map((user, index) => ({ name: user.username, isAdmin: user.isAdmin, isSelected: false, area: this.areas[index % this.areas.length] }));
    });

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

  private initialize() {
    this.getRoomInfo();
  }

  private getRoomInfo(): void {
    this.roomService.getRoomNameById(this.roomId).subscribe(
      (name) => {
        this.roomName = name;
        this.roomNameChanged.emit(this.roomName);
      },
      (error) => {
        console.error('Error al obtener la información de la sala:', error);
      }
    );
  }

  private subscribeToData() {
    this.subscribeToUsersInRoom();
    this.subscribeToOverlayValidation();
  }

  private subscribeToUsersInRoom() {
    this.usersInRoomSubscription = this.roomService
      .getUsersInRoom(this.roomId)
      .pipe(
        map((users: any[]) =>
          users.map((user, index) => ({
            name: user.username,
            isAdmin: user.isAdmin,
            isSelected: false,
            area: this.areas[index % this.areas.length],
          }))
        )
      )
      .subscribe((users) => {
        const adminIndex = users.findIndex((user) => user.isAdmin);
        if (adminIndex !== -1 && adminIndex !== 0) {
          const adminUser = users.splice(adminIndex, 1)[0];
          users.unshift(adminUser);
        }
        this.joinedUsers = users;
        this.isAdmin = users.length > 0 && users[0].isAdmin;
      });
  }

  private subscribeToOverlayValidation() {
    this.socket$.on('overlayValidationStatus', (valid: boolean) => {});
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
  }

  handleNewUserJoined(users: any[]) {
    if (users.length > 8) {
      alert('El número de usuarios es mayor a 8');
    } else {
      this.joinedUsers = users.map((user, index) => ({
        name: user.username,
        isAdmin: user.isAdmin,
        isSelected: false,
        area: this.areas[index % this.areas.length],
      }));
    }
  }

  openInvitePlayersOverlay() {
    this.showInvitePlayersOverlay = true;
  }

  closeInvitePlayersOverlay() {
    this.showInvitePlayersOverlay = false;
  }

  toggleUserListOverlay() {
    this.showUserListOverlay = !this.showUserListOverlay;
  }

  handleRolPlayer(rolPlayer: string) {
    localStorage.setItem('rolPlayer', rolPlayer.toLowerCase());
  }

  getShareableLink(): string {
    return `http://localhost:4200/#/table/${this.roomId}`;
  }

  isSpectator(): boolean {
    const storedRolPlayer = localStorage.getItem('rolPlayer');
    return storedRolPlayer === 'espectador';
  }
}
