import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Auth } from '../pages/autenticacion';
import { Reservas } from '../pages/reservas/reservas';
import { Registro } from '../pages/registro';
import { Datos } from '../pages/datos';

import { AuthProvider } from '../pages/auth-provider';
import { DataProvider } from '../pages/data-provider';


// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyA0ALrLoiBkouur2GmjXsJVi90CmAO2fFU",
    authDomain: "prueba-5f14d.firebaseapp.com",
    databaseURL: "https://prueba-5f14d.firebaseio.com",
    storageBucket: "prueba-5f14d.appspot.com",
    messagingSenderId: "334413686662"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Reservas,
    Auth,
    Registro,
    Datos
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Reservas,
    Auth,
    Registro,
    Datos
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthProvider, DataProvider]
})
export class AppModule {}
