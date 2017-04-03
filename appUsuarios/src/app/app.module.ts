import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { Reservas } from '../pages/reservas/reservas';

import { Auth } from '../pages/autenticacion/autenticacion';
import { AuthProvider } from '../providers/auth-provider';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const firebaseConfig = {
    apiKey: "AIzaSyDHaNLG_s3KpZqHc5y7G_kWJ9l99LDUC04",
    authDomain: "padel-56238.firebaseapp.com",
    databaseURL: "https://padel-56238.firebaseio.com",
    projectId: "padel-56238",
    storageBucket: "padel-56238.appspot.com",
    messagingSenderId: "172184786731"

};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Auth,
    Reservas
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Auth,
    Reservas
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
