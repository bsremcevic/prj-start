import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyD8FsEtY3_EJweYPLMkIK718IF0YLPTh2A",
      authDomain: "ng-recipe-book-14d4e.firebaseapp.com"
    });

    //this part is my bonus task.
    //this checks if the token exists on the app initialization,
    //so the user could be logged in right away if he did not logout previously.
    // const localToken = Object.keys(window.localStorage)[0] || '';

    Object.keys(window.localStorage).filter(item => {
      if(item.startsWith("firebase")){
        console.log(item + " --- Zika")
        let data = JSON.parse(window.localStorage[item]);
        console.log(data.stsTokenManager.accessToken + " ------ TOKEN ");
        this.authService.token = data.stsTokenManager.accessToken;
      }
    })[0];

  }
  // loadedFeature:string = 'recipe';
  //
  // onNavigate(feature:string){
  //   this.loadedFeature = feature;
  //   console.log(this.loadedFeature, 'Iz App komponente');
  // }
}
