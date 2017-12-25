import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
                this.token = token;
                console.log(response);
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
      console.log();
  }

  getToken(){
    firebase.auth().currentUser.getToken()
      .then(
        (token: string) => this.token = token
      );
      return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    console.log(this.token);
    firebase.auth().signOut();
    this.token = null;
    console.log(this.token);
    this.router.navigate(['/recipes']);
  }

}
