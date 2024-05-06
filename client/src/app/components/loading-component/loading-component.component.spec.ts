import { LoadingComponentComponent } from './loading-component.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';

describe('LoadingComponentComponent', () => {
  let component: LoadingComponentComponent;
  let router: Router;
  let userService: UserService;
  let ngZone: NgZone;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const userServiceSpy = jasmine.createSpyObj('UserService', ['logoutUser']);
    userServiceSpy.logoutUser.and.returnValue(of(null));
    const ngZoneSpy = jasmine.createSpyObj('NgZone', ['run', 'runOutsideAngular']);

    router = routerSpy;
    userService = userServiceSpy;
    ngZone = ngZoneSpy;

    component = new LoadingComponentComponent(router, userService, ngZone);
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar las propiedades loading y pragmaName', () => {
    expect(component.loading).toBe('./../../../assets/img/pragmalogo.png');
    expect(component.pragmaName).toBe('./../../../assets/img/pragmaname.png');
  });

  it('debería llamar a logoutAndNavigate en ngOnInit', () => {
    spyOn(component, 'logoutAndNavigate');
    component.ngOnInit();
    expect(component.logoutAndNavigate).toHaveBeenCalled();
  });

  it('debería llamar a logoutUser de UserService en logoutAndNavigate', () => {
    component.logoutAndNavigate();
    expect(userService.logoutUser).toHaveBeenCalled();
  });
});
