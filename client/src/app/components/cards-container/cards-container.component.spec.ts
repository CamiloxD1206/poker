import { CardsContainerComponent } from './cards-container.component';

describe('CardsContainerComponent', () => {
  let component: CardsContainerComponent;

  beforeEach(() => {
    component = new CardsContainerComponent();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el arreglo specialNumbers', () => {
    expect(component.specialNumbers).toEqual([0, 1, 3, 5, 8, 13, 21, 34, 55, 89, '?', '☕']);
  });

  it('debería inicializar selectedCard como null', () => {
    expect(component.selectedCard).toBeNull();
  });

  it('debería establecer selectedCard desde el localStorage si existe', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{"value": 42}');
    component.ngOnInit();
    expect(component.selectedCard).toEqual({ value: 42 });
  });

  it('no debería establecer selectedCard si el localStorage está vacío', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(component.selectedCard).toBeNull();
  });

  it('debería establecer selectedCard y emitir el evento cardSelected', () => {
    const cardValue = 42;
    spyOn(component.cardSelected, 'emit');
    component.onCardSelect(cardValue);
    expect(component.selectedCard).toBe(cardValue);
    expect(component.cardSelected.emit).toHaveBeenCalledWith(cardValue);
  });

  it('no debería emitir el evento cardSelected si selectedCard es el mismo', () => {
    component.selectedCard = 42;
    spyOn(component.cardSelected, 'emit');
    component.onCardSelect(42);
    expect(component.cardSelected.emit).not.toHaveBeenCalled();
  });

  it('debería establecer selectedCard y emitir el evento cardSelected si selectedCard es null', () => {
    const cardValue = 42;
    spyOn(component.cardSelected, 'emit');
    component.onCardSelect(cardValue);
    expect(component.selectedCard).toBe(cardValue);
    expect(component.cardSelected.emit).toHaveBeenCalledWith(cardValue);
  });

  it('debería guardar selectedCard en el localStorage', () => {
    spyOn(localStorage, 'setItem');
    const cardValue = 42;
    component.onCardSelect(cardValue);
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedCard', JSON.stringify(cardValue));
  });
});
