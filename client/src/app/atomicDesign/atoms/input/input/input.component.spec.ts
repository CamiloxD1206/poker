import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InputComponent } from './input.component';

@Component({
  template: `
    <app-input (inputValue)="onInput($event)"></app-input>
  `,
})
class TestHostComponent {
  inputValue: string = '';

  onInput(value: string) {
    this.inputValue = value;
  }
}

describe('InputComponent', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('debería emitir un evento con el valor vacío si no se proporciona ningún valor', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(testHostComponent.inputValue).toEqual('');
  });

  it('debería emitir el valor de entrada correctamente cuando se proporciona un valor', () => {
    const testValue = 'Valor de Prueba';
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(testHostComponent.inputValue).toEqual(testValue);
  });

  it('no debería emitir un evento si se presiona "Enter"', () => {
    spyOn(testHostComponent, 'onInput');
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();
    expect(testHostComponent.onInput).not.toHaveBeenCalled();
  });

  it('debería emitir un evento cuando se hace clic fuera del campo de entrada', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Valor de Prueba';
    inputElement.dispatchEvent(new Event('input'));
    document.body.click();
    fixture.detectChanges();
    expect(testHostComponent.inputValue).toEqual('Valor de Prueba');
  });



});
