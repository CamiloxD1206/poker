import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  template: `

    <app-card [value]="value" [additionalClass]="additionalClass" [isSelected]="isSelected"></app-card>
  `,
})
class TestHostComponent {
  value: string="";
  additionalClass: string="";
  isSelected: boolean=false;
}

describe('CardComponent', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('debería tener las clases correctas cuando isSelected es false', () => {
    testHostComponent.isSelected = false;
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('.card');
    expect(cardElement.classList.contains('card--selected')).toBeFalse();
  });

  it('debería tener la clase adicional y no tener isSelected cuando ambas están presentes', () => {
    testHostComponent.isSelected = true;
    testHostComponent.additionalClass = 'custom-class';
    fixture.detectChanges();
    const cardElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('.card');
    expect(cardElement.classList.contains('custom-class')).toBeTrue();
    expect(cardElement.classList.contains('card--selected')).toBeTrue();
});


  it('debería mostrar un valor predeterminado si no se proporciona ninguno', () => {
    fixture.detectChanges();
    const spanElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('span');
    expect(spanElement.textContent).toEqual('');
  });

  it('debería mostrar el valor proporcionado', () => {
    const mockValue = 'Texto de Prueba';
    testHostComponent.value = mockValue;
    fixture.detectChanges();
    const spanElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('span');
    expect(spanElement.textContent).toEqual(mockValue);
  });
});
