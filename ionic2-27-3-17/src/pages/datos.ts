import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../pages/auth-provider'

import { HomePage } from '../pages/home/home'
import firebase from 'firebase';

@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html'
})
export class Datos {

  usersRef: any = firebase.database().ref('usuarios');
  user:any;

  ab: boolean;
  notificaciones: boolean;
  datos:any;
  usuarios: FirebaseListObservable<any>;
  usuario: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public af: AngularFire,
              public auth: AuthProvider
              ) 
  {
    this.usuarios = af.database.list('/usuarios');
    this.user = firebase.auth().currentUser;
    this.usuario = this.af.database.list('/usuarios', {
        query: {
            orderByChild: 'uid',
            equalTo: this.user.uid
        }
    });
    console.log(this.user.uid);
  }

  ngOnInit() {
    this.datos = new FormGroup({
        nombre: new FormControl(""),
        dni: new FormControl(""/*,Validators.required*/),
        telefono: new FormControl(""/*,Validators.required*/),
        abonado: new FormControl(""),
        nivel: new FormControl(""),
        notificaciones: new FormControl(""),
    })
    console.log(this.datos);
  }

  guardar(){
    let d = this.datos.value;
    //this.usersRef.child().child('PHtCDdrK23NHLadJfNVvpHyqKkw1').update({nombre:d.nombre});
    //this.usuario.nombre = this.datos.nombre;
    firebase.database().ref('usuarios/' + this.user.uid).update({
      nombre: 'hola'
  });

  }

  cancelar(){
      this.navCtrl.push(HomePage);
  }

  /*createAccount() {    
    
    let datos = this.datos.value;
    this.auth.createAccount(credentials)
    .then((data) => {
      console.log("uid: ",data.uid);
      this.usuarios.push({
              uid: data.uid,
              nombre: datos.nombre,
              dni: datos.dni,
              telefono: datos.telefono,
              abonado: this.ab,
              nivelJuego: datos.nivel,
              notificaciones: this.notificaciones,
            });

    }, (error) => {
      console.log("Error: ",error.message);
    });
    
  };*/
}
