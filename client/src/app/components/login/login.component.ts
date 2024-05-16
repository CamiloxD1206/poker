import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../services/cognitoService/cognito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  signUpForm: FormGroup = new FormGroup({});
  confirmationCodeForm: FormGroup=new FormGroup({});
  isLoggedIn: boolean = false;
  isConfirmationRequired: boolean = false;

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.isConfirmationRequired = false;
    this.createForms();
    this.checkUserStatus();
  }

  createForms(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nickname: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.confirmationCodeForm = this.fb.group({
      confirmationCode: ['', Validators.required]
    });
  }

  checkUserStatus(): void {
    this.cognitoService.handleAutoSignIn().then(status => {
      this.isLoggedIn = status;
    });
  }

  signIn(): void {
    const { email, password } = this.loginForm.value;
    this.cognitoService.handleSignIn({ username: email, password }).then(status => {
      this.isLoggedIn = status;
      this.redirection()
    });
  }

  signUp(): void {
    const { email, nickname, password } = this.signUpForm.value;
    this.cognitoService.handleSignUp({ username: email, nickname, email, password })
      .then(() => {
        this.isConfirmationRequired = true;
        console.log('Confirmation code sent. Please check your email.');
        localStorage.setItem('username', nickname);
      })
      .catch(error => {
        console.error('Error during sign up:', error);
      });
  }

  confirmSignUp(): void {
    const { email } = this.signUpForm.value;
    const { confirmationCode } = this.confirmationCodeForm.value;
    this.cognitoService.handleSignUpConfirmation({ username: email, confirmationCode })
      .then(() => {
        this.isLoggedIn = true;
        this.isConfirmationRequired = false;
        this.redirection()
      })
      .catch(error => {
        console.error('Error during confirmation:', error);
      });
  }
redirection(){
  this.router.navigate(['/roomct']);
}

}
