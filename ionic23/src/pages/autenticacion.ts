import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormGroup, FormControl } from '@angular/forms';

import { AngularFireModule, AuthMethods } from 'angularfire2';
 
import { AuthProvider } from '../pages/auth-provider'

import { HomePage } from '../pages/home/home'

@Component({
  selector: 'page-auth',
  templateUrl: 'autenticacion.html'
})
export class Auth {

  loginForm:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: AuthProvider
              ) 
  {
    
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
        this.navCtrl.push(HomePage);
    }, (error) => {
      console.log("Error: ",error.message);
    });
  };

  createAccount() {
    let credentials = this.loginForm.value;
    this.auth.createAccount(credentials)
    .then((data) => {
      console.log("uid: ",data.uid);
    }, (error) => {
      console.log("Error: ",error.message);
    });
  };
}
