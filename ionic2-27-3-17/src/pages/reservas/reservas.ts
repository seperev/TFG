import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';

import firebase from 'firebase';


@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html'
})
export class Reservas {

  //reservas: [string];
  usuarios: FirebaseListObservable<any>;
  reservas2: FirebaseListObservable<any>;
  loginForm:any;
  res:any;

  reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, af: AngularFire, 
              public actionSheetCtrl: ActionSheetController,
              public params: NavParams) {
    this.res = [];
    var user = firebase.auth().currentUser;
    this.res = af.database.list('/reservas', {
      query: {
        orderByChild: 'usuario',
        equalTo: user.uid
      }
    });
    

  }

}