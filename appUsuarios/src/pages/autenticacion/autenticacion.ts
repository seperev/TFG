import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods, FirebaseListObservable, AngularFire } from 'angularfire2';
 
import { AuthProvider } from '../../providers/auth-provider';

import { Reservas } from '../reservas/reservas';


@Component({
  selector: 'page-auth',
  templateUrl: 'autenticacion.html'
})
export class Auth {

  loginForm:any;
  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              af: AngularFire,
              public auth: AuthProvider
              ) 
  {
    this.usuarios = af.database.list('/Usuarios');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        email: new FormControl("",[Validators.required]),
        password: new FormControl("",Validators.required)
    });
  }

  signin() {
    
    this.auth.signin(this.loginForm.value)
    .then((data) => {
        this.navCtrl.push(Reservas);
    }, (error) => {
      console.log("Error: ",error.message);
    });
  };

  createAccount() {
    let credentials = this.loginForm.value;
    this.auth.createAccount(credentials)
    .then((data) => {
      console.log("uid: ",data.uid);
      this.usuarios.push({
              uid: data.uid
            });

    }, (error) => {
      console.log("Error: ",error.message);
    });
  };
}
