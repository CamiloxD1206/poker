import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-loading-component',
  templateUrl: './loading-component.component.html',
  styleUrls: ['./loading-component.component.scss']
})
export class LoadingComponentComponent implements OnInit {
  loading: string = "./../../../assets/img/pragmalogo.png";
  pragmaName: string = "./../../../assets/img/pragmaname.png";

  constructor(private router: Router, private authService: UserService, private ngZone: NgZone) { }

  ngOnInit() {
    this.logoutAndNavigate();
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/roomct']);
        });
      }, 3000);
    });
  }

  logoutAndNavigate() {
    this.authService.logoutUser().subscribe(
      () => {
        console.log('Cerrado de sesion exitoso');
      },
      error => {
        console.error(error);
      }
    );
  }
}
