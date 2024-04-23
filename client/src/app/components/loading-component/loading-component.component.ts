import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private authService: UserService) { }

  ngOnInit() {
    // Llamar a la función de cierre de sesión al iniciar el componente LoadingComponentComponent
    this.logoutAndNavigate();

    setTimeout(() => {
      this.router.navigate(['/roomct']);
    }, 3000);
  }

  logoutAndNavigate() {
    this.authService.logoutUser().subscribe(() => {
      console.log('Logged out successfully');
    }, error => {
      console.error('Failed to logout', error);
    });
  }
}
