import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;

  beforeEach(() => {

    component = new LinkComponent();
  });

  it('debería crearse', () => {

    expect(component).toBeTruthy();
  });

  it('debería inicializar shareableLink con una cadena vacía', () => {

    expect(component.shareableLink).toBe('');
  });

  it('debería emitir el evento closeOverlay cuando se llama a copyToClipboard', () => {

    spyOn(component.closeOverlay, 'emit');

    spyOn(document, 'querySelector').and.returnValue({
      value: 'https://ejemplo.com',
      select: () => {},
    } as HTMLInputElement);
    spyOn(document, 'execCommand').and.stub();

    component.copyToClipboard();


    expect(component.closeOverlay.emit).toHaveBeenCalled();
  });

  it('debería emitir el evento closeOverlay cuando se llama a onCloseOverlay', () => {

    spyOn(component.closeOverlay, 'emit');

    component.onCloseOverlay();

    expect(component.closeOverlay.emit).toHaveBeenCalled();
  });
});
