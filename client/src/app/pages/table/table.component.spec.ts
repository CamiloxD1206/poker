import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { TableComponent } from './table.component';
import { RoomService } from '../../services/roomService/room.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let roomService: RoomService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    const roomServiceSpy = jasmine.createSpyObj('RoomService', [
      'getSocket',
      'joinRoomWebSocket',
      'getRoomNameById',
      'getUsersInRoom',
      'notifyOverlayValidation',
    ]);
    roomServiceSpy.getUsersInRoom.and.returnValue(of([]));
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params'], {
      params: of(convertToParamMap({ _id: '663b9aff5b247bfe61e81b04' })),
    });
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    roomService = TestBed.inject(RoomService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should handle new user joined correctly', () => {
    const newUsers = [
      { username: 'user1', isAdmin: true },
      { username: 'user2', isAdmin: false },
      { username: 'user3', isAdmin: false },
    ];

    component.handleNewUserJoined(newUsers);

    expect(component.joinedUsers).toEqual([
      { userId: '', name: 'user1', isAdmin: true, isSelected: false, area: 'top-left' },
      { userId: '', name: 'user2', isAdmin: false, isSelected: false, area: 'top' },
      { userId: '', name: 'user3', isAdmin: false, isSelected: false, area: 'top-right' },
    ]);
  });

  it('should alert when more than 8 users joined', () => {
    spyOn(window, 'alert');
    const newUsers = Array.from({ length: 9 }, (_, i) => ({ username: `user${i + 1}`, isAdmin: false }));

    component.handleNewUserJoined(newUsers);

    expect(window.alert).toHaveBeenCalledWith('El número de usuarios es mayor a 8');
  });



  it('should receive overlay validation correctly', () => {
    component.receiveOverlayValidation(true);
    expect(component.overlayValid).toBeTruthy();
    expect(component.showCreateUserComponent).toBeFalsy();
    expect(roomService.notifyOverlayValidation).toHaveBeenCalledWith(true);
  });

  it('should receive room created correctly', () => {
    const roomIdChangedSpy = spyOn(component.roomIdChanged, 'emit');
    const validationStatusSpy = spyOn(component.validationStatus, 'emit');

    component.receiveRoomCreated('new_room_id');
    expect(component.roomId).toBe('new_room_id');
    expect(roomIdChangedSpy).toHaveBeenCalledWith('new_room_id');
    expect(validationStatusSpy).toHaveBeenCalledWith(true);
  });

  it('should handle user joined correctly', () => {
    component.showCreateUserComponent = true;
    component.handleUserJoined();
    expect(component.showCreateUserComponent).toBeFalsy();
  });

  it('should get shareable link correctly', () => {
    component.roomId = 'test_room_id';
    const shareableLink = component.getShareableLink();
    expect(shareableLink).toBe('http://localhost:4200/#/table/test_room_id');
  });

  it('should determine spectator role correctly', () => {
    localStorage.removeItem('rolPlayer');
    expect(component.isSpectator()).toBeFalsy();

    localStorage.setItem('rolPlayer', 'espectador');
    expect(component.isSpectator()).toBeTruthy();
  });
});
