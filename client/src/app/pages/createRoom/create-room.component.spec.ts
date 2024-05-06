import { CreateRoomComponent } from './create-room.component';
import { RoomService } from 'src/app/services/roomService/room.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CreateRoomComponent', () => {
  let component: CreateRoomComponent;
  let roomService: jasmine.SpyObj<RoomService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const roomServiceSpy = jasmine.createSpyObj('RoomService', ['createRoom']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    roomService = roomServiceSpy;
    router = routerSpy;

    component = new CreateRoomComponent(roomService, router);
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las propiedades', () => {
    expect(component.imgTitleUrl).toBe('../../../../assets/img/pragmalogo.png');
    expect(component.roomName).toBe('');
    expect(component.errorMessages).toEqual([]);
    expect(component.isButtonDisabled).toBe(true);
  });

  it('debería validar el nombre de la sala', () => {
    component.receiveRoomName('Test');
    expect(component.errorMessages).toContain('El nombre debe tener al menos 5 caracteres.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveRoomName('Test Room Name 123!@#');
    expect(component.errorMessages).toContain('El nombre no puede contener caracteres especiales.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveRoomName('Test Room Name 1234');
    expect(component.errorMessages).toContain('El nombre no puede contener más de tres números.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveRoomName('Valid Room Name');
    expect(component.errorMessages).toEqual([]);
    expect(component.isButtonDisabled).toBe(false);
  });

  it('debería crear la sala y navegar', () => {
    const roomId = 'room123';
    const roomName = 'Nombre de Sala Válido';
    component.receiveRoomName(roomName);
    roomService.createRoom.and.returnValue(of({ _id: roomId }));
    spyOn(component.roomCreated, 'emit');
    component.handleButtonClick();
    expect(roomService.createRoom).toHaveBeenCalledWith(roomName);
    expect(component.roomCreated.emit).toHaveBeenCalledWith({ id: roomId, name: roomName });
    jasmine.clock().install();
    jasmine.clock().tick(1001);
    expect(router.navigate).toHaveBeenCalledWith(['/table', roomId]);
    jasmine.clock().uninstall();
  });
});
