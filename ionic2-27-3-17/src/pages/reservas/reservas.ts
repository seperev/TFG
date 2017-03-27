import { Component } from '@angular/core';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

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
  re: any;
  r: string;

  reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, af: AngularFire, 
              public actionSheetCtrl: ActionSheetController) {
    var reservas = [];
    this.re = new Array();
    //this.re = 'adios';
    this.r = 'hola';
    var user = firebase.auth().currentUser;
    //this.reservas = af.database.list('/reservas');
    var a = af.database.list('/reservas');
    //this.reservas.push(a[0]);
    //console.log(a);
    //console.log(user.uid);
    this.reservasRef.orderByChild('usuario').equalTo(user.uid).on("child_added", function(snapshot){
            //a.push(snapshot.val().nombre)
            this.re.push(snapshot.val());
            //this.re.push(snapshot.val())
            //console.log(this.re[0]);
            //console.log('nombre ' + this.re[0].nombre);
            //r.push(snapshot.val());
            //console.log(this.re);
            //console.log(snapshot.val().nombre)
        });
        
    console.log(a);

  }



}