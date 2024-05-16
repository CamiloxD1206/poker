import { CreateUserComponent } from './create-user.component';
import { UserService } from 'src/app/services/userService/user.service';
import { RoomService } from '../../services/roomService/room.service';
import { of } from 'rxjs';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let userService: jasmine.SpyObj<UserService>;
  let roomService: jasmine.SpyObj<RoomService>;
  let activatedRoute: any;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['createUser', 'loginUser', 'setUserId', 'getUserId']);
    const roomServiceSpy = jasmine.createSpyObj('RoomService', ['joinRoom']);


    const activatedRouteSpy = {
      params: of({ _id: '6638fdcd99a39d88adc983b8' })
    };

    userService = userServiceSpy;
    roomService = roomServiceSpy;
    activatedRoute = activatedRouteSpy;

    component = new CreateUserComponent(userService, roomService, activatedRoute);
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las propiedades', () => {
    expect(component.message).toBe('continuar');
    expect(component.userName).toBe('');
    expect(component.rolPlayer).toBe('jugador');
    expect(component.roomId).toBe('6638fdcd99a39d88adc983b8');
    expect(component.textButton).toBe('Continuar');
    expect(component.errorMessages).toEqual([]);
    expect(component.isButtonDisabled).toBe(true);
    expect(component.isSpectator).toBe(false);
  });

  it('debería validar el nombre de usuario', () => {
    component.receiveduserName('Test');
    expect(component.errorMessages).toContain('El nombre debe tener al menos 5 caracteres.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveduserName('Test User Name 123!@#');
    expect(component.errorMessages).toContain('El nombre no puede contener caracteres especiales.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveduserName('Test User Name 1234');
    expect(component.errorMessages).toContain('El nombre no puede contener más de tres números.');
    expect(component.isButtonDisabled).toBe(true);

    component.receiveduserName('Valid User Name');
    expect(component.errorMessages).toEqual([]);
    expect(component.isButtonDisabled).toBe(false);
  });


  it('debería crear usuario, iniciar sesión y unirse a la sala', () => {
    const userId = 'user123';
    const userName = 'Valid User Name';
    const roomId = 'room456';
    component.receiveduserName(userName);
    component.roomId = roomId;

    userService.createUser.and.returnValue(of({ userId: userId, username: userName }));
    userService.loginUser.and.returnValue(of({ userId: userId, username: userName }));
    roomService.joinRoom.and.returnValue(of({}));

    spyOn(component.roomIdChanged, 'emit');
    spyOn(component.validationStatus, 'emit');
    spyOn(component.userJoined, 'emit');
    spyOn(component.rolPlayerEmitter, 'emit');

    component.handleButtonClick();

    expect(userService.createUser).toHaveBeenCalledWith(userName, 'jugador');
    expect(userService.loginUser).toHaveBeenCalledWith(userName);
    expect(roomService.joinRoom).toHaveBeenCalledWith(roomId);
    expect(component.roomIdChanged.emit).toHaveBeenCalledWith(roomId);
    expect(component.validationStatus.emit).toHaveBeenCalledWith(true);
    expect(component.userJoined.emit).toHaveBeenCalledWith(userName);
    expect(component.rolPlayerEmitter.emit).toHaveBeenCalledWith('jugador');
  });
});
