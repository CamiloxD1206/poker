import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;

  beforeEach(() => {
    component = new NavBarComponent();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar iconPragma', () => {
    expect(component.iconPragma).toBe('./../../../assets/img/pragmalogo.png');
  });

  it('debería inicializar roomId con una cadena vacía', () => {
    expect(component.roomId).toBe('');
  });

  it('debería inicializar roomName con una cadena vacía', () => {
    expect(component.roomName).toBe('');
  });

  it('debería emitir el evento openOverlay cuando se llama a openInvitePlayersOverlay', () => {
    spyOn(component.openOverlay, 'emit');
    component.openInvitePlayersOverlay();
    expect(component.openOverlay.emit).toHaveBeenCalled();
  });



});
