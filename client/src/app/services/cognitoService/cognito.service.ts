import { Injectable } from '@angular/core';
import { signUp, confirmSignUp, autoSignIn, signIn, signOut } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  constructor() { }

  async handleSignUp({ username, nickname, password, email }: SignUpParameters): Promise<void> {
    try {
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            nickname
          }
        }
      });
    } catch (error) {
      console.log('error signing up:', error);
      throw error;
    }
  }

  async handleSignUpConfirmation({ username, confirmationCode }: ConfirmSignUpInput): Promise<void> {
    try {
      await confirmSignUp({ username, confirmationCode });
    } catch (error) {
      console.log('error confirming sign up', error);
      throw error;
    }
  }

  async handleAutoSignIn(): Promise<boolean> {
    try {
      const { isSignedIn } = await autoSignIn();
      return isSignedIn;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async handleSignIn({ username, password }: SignInInput): Promise<boolean> {
    try {
      const { isSignedIn } = await signIn({ username, password });
      return isSignedIn;
    } catch (error) {
      console.log('error signing in', error);
      return false;
    }
  }

  async handleSignOut(): Promise<void> {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}

interface SignUpParameters {
  username: string;
  nickname: string;
  password: string;
  email: string;
}

interface ConfirmSignUpInput {
  username: string;
  confirmationCode: string;
}

interface SignInInput {
  username: string;
  password: string;
}
