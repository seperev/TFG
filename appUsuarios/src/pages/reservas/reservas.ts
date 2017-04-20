import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';

import { AuthProvider } from '../../providers/auth-provider';

@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html'
})
export class Reservas {

  
  usuarios: FirebaseListObservable<any>;

  
  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()-5).toString();
  maxFecha: string = (new Date().getFullYear()+3).toString();
  //reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider
              ) 
  {
    this.usuarios = af.database.list('/usuarios');
  }

  logout(){
      this.auth.logout();
  }

}
