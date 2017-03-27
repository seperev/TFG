import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../auth-provider';
import { DataProvider } from '../data-provider';
import { Reservas } from '../reservas/reservas';

import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  usuarios: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  loginForm:any;

  reservasRef: any = firebase.database().ref('reservas');

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
    var rese = [];
    this.reservasRef.orderByChild('usuario').equalTo(usuario).on("child_added", function(snapshot){
            rese.push(snapshot.val().nombre)});
            

    var user = firebase.auth().currentUser;

    //console.log(r);
    //console.log(user.uid);
    this.navCtrl.push(Reservas);
    
  }

/* Este es el método intentado hacer uso del provider, no me ha funcionado
  verReservas(usuario){

    /*
    var res = this.data.getReservasDeUsuario(usuario);
    // Al ser asincrono, se ejecuta la instrucción anterior y no espera a que el método devuelva el 
    // resultado y por lo tanto en el primer viaje que lo ejecutas el res está vacio

    // Tengo que mirarme la documentación de observables y promises para usarla en este caso
    console.log(res);
    
    for(var i = 0; i < res.length; i++){
      console.log(res[i]);
    }
    */

/* Me sigue pasando lo mismo que antes, le tengo que dar dos veces para que me aparezcan
    var r = [];

    this.data.getReservasDeUsuario(usuario).then(
      data => data.forEach(element => {
        console.log(element);
      })
    );
*/

/* Me pasa lo mismo
    this.data.getReservasDeUsuario(usuario).then(
      data => console.log(data)
    )
*/    
    /*
    var r = [];
    this.data.getReservasDeUsuario(usuario).then(
      data => r= data
    )
    console.log(r);

  }
*/

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
