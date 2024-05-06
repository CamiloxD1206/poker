import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { TableComponent } from './table.component';
import { RoomService } from '../../services/roomService/room.service';
import { CardsContainerComponent } from '../../components/cards-container/cards-container.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let roomService: RoomService;
  let activatedRoute: ActivatedRoute;
  let cookieService: CookieService;

  beforeEach(async () => {
    const roomServiceSpy = jasmine.createSpyObj('RoomService', [
      'getSocket',
      'joinRoomWebSocket',
      'getRoomNameById',
      'getUsersInRoom',
      'notifyOverlayValidation',
    ]);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params'], {
      params: of({ _id: 'room123' }),
    });
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent, CardsContainerComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize properties', () => {
    expect(component.showInvitePlayersOverlay).toBeFalsy();
    expect(component.showCreateUserComponent).toBeTruthy();
    expect(component.showUserListOverlay).toBeFalsy();
    expect(component.overlayValid).toBeFalsy();
    expect(component.roomId).toBe('room123');
    expect(component.roomName).toBe('');
    expect(component.userName).toBe('');
    expect(component.isAdmin).toBeFalsy();
    expect(component.userToken).toBe('');
    expect(component.isSpectator).toBeFalsy();
    expect(component.joinedUsers).toEqual([]);
    expect(component.selectedCards).toEqual([]);
    expect(component.selectedCard).toBeNull();
    expect(component.selectedCardsByUser).toEqual({});
    expect(component.isPlayerRole).toBeTruthy();
  });

  it('should subscribe to room service observables on init', () => {
    spyOn(roomService, 'joinRoomWebSocket');
    spyOn(roomService, 'getUsersInRoom').and.returnValue(of([]));
    spyOn(roomService, 'getRoomNameById').and.returnValue(of('Room Name'));

    component.ngOnInit();

    expect(roomService.joinRoomWebSocket).toHaveBeenCalledWith('room123');
    expect(roomService.getUsersInRoom).toHaveBeenCalledWith('room123');
    expect(roomService.getRoomNameById).toHaveBeenCalledWith('room123');
    expect(component.roomName).toBe('Room Name');
  });

  // Agrega más pruebas para las demás funcionalidades del componente...
});
