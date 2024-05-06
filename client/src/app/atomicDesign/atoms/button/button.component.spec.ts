import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('emite el evento al hacer clic', () => {
    let emitted = false;
    component.buttonClick.subscribe(() => {
      emitted = true;
    });
    component.handleClick();
    expect(emitted).toBe(true);
  });

  it('asigna valor al botón', () => {
    const testButtonValue = 'Test Button';
    component.buttonValue = testButtonValue;
    expect(component.buttonValue).toBe(testButtonValue);
  });

  it('asigna clase adicional al botón', () => {
    const testAdditionalClass = 'test-class';
    component.additionalClass = testAdditionalClass;
    expect(component.additionalClass).toBe(testAdditionalClass);
  });

  it('asigna propiedad de deshabilitado al botón', () => {
    const testIsDisabled = true;
    component.isDisabled = testIsDisabled;
    expect(component.isDisabled).toBe(testIsDisabled);
  });

  it('deshabilita el botón cuando isDisabled es verdadero', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('input');
    expect(buttonElement.disabled).toBe(true);
  });

  it('habilita el botón cuando isDisabled es falso', () => {
    component.isDisabled = false;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('input');
    expect(buttonElement.disabled).toBe(false);
  });

  it('cambia la clase del botón al actualizar additionalClass', () => {
    const initialClass = 'initial-class';
    const updatedClass = 'updated-class';
    component.additionalClass = initialClass;
    fixture.detectChanges();
    let buttonElement = fixture.nativeElement.querySelector('input');
    expect(buttonElement.classList.contains(initialClass)).toBe(true);
    component.additionalClass = updatedClass;
    fixture.detectChanges();
    buttonElement = fixture.nativeElement.querySelector('input');
    expect(buttonElement.classList.contains(updatedClass)).toBe(true);
    expect(buttonElement.classList.contains(initialClass)).toBe(false);
  });
});
