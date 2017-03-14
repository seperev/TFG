import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../auth-provider';
import { DataProvider } from '../data-provider';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  usuarios: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  loginForm:any;

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              public data:DataProvider) {
    this.usuarios = af.database.list('/usuarios');
    this.reservas = af.database.list('/reservas');
   


  }


  logout(){
    this.auth.logout();
  }

  addUsuario(){
    let prompt = this.alertCtrl.create({
      title: 'nombre usuario',
      message: "Introduce un nombre de usuario",
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.usuarios.push({
              nombre: data.nombre
            });
          }
        }
      ]
    });
    prompt.present();
  }


  aniadirReserva(usuario){
    let prompt = this.alertCtrl.create({
      title:'reserva',
      message:'nombre de la reserva',
      inputs:[
        {
          name:'reserva',
          placeholder: 'Reserva'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            this.reservas.push({
              nombre:data.reserva,
              usuario:usuario
            });
            
          }
        }
      ]
    });
    prompt.present();
  }

  getReservas(usuario){
    let reservas = [];
    this.reservas.forEach((reserva) => {
      if(reserva.usuario == usuario){
        reservas.push(reserva.nombre);
      }

    });
    return reservas;
    
  }

  verReservas(usuario){



    var res = this.data.getReservasDeUsuario(usuario);
    
    // Al ser asincrono, se ejecuta la isntrucción anterior y no espera a que el método devuelva el 
    // resultado y por lo tanto en el primer viaje que lo ejecutas el res está vacio

    // Tengo que mirarme la documentación de observables y promises para usarla en este caso
    console.log(res.length);
    for(var i = 0; i < res.length; i++){
      console.log(res[i]);
    }
    
    
  }

  removeUsuario(usuario: string){
    this.usuarios.remove(usuario);
  }

  updateUsuario(usuario, apellido){
    let prompt = this.alertCtrl.create({
      title: 'apellido',
      message: "Update the apellido for this usuario",
      inputs: [
        {
          name: 'apellido',
          placeholder: 'Apellido',
          value: apellido
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.usuarios.update(usuario, {
              apellido: data.apellido
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(usuario, apellido) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete usuario',
          role: 'destructive',
          handler: () => {
            this.removeUsuario(usuario);
          }
        },{
          text: 'Update apellido',
          handler: () => {
            this.updateUsuario(usuario, apellido);
          }
        },{
          text: 'Nueva reserva',
          handler: () => {
            this.aniadirReserva(usuario);
          }
        },{
          text: 'Ver reservas',
          handler: () => {
            this.verReservas(usuario);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
