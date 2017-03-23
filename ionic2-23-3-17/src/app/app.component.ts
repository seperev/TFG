import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { Auth } from '../pages/autenticacion';
//import { Reservas } from '../pages/reservas/reservas';

import { AngularFire} from 'angularfire2';

import { AuthProvider } from '../pages/auth-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any;

  constructor(platform: Platform, 
              public af: AngularFire, 
              public authProvider:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.intialize();
    });
  }

     intialize() {
        this.af.auth.subscribe(auth => {
        if(auth) {
           this.rootPage = HomePage;
        } else {
           this.rootPage = Auth;
        }
     });
     }
}
