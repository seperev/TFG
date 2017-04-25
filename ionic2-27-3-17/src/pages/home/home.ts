import { Component } from '@angular/core';

//import { NavController } from 'ionic-angular';

import {AngularFire, FirebaseListObservable, AuthProviders, AuthMethods} from 'angularfire2';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../auth-provider';
import { DataProvider } from '../data-provider';
import { Reservas } from '../reservas/reservas';
import { Datos } from '../datos';

import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  usuarios: FirebaseListObservable<any>;
  reservas: FirebaseListObservable<any>;
  pistas: FirebaseListObservable<any>;
  loginForm:any;
  res:any;

  //a:any;
  a = [];

  fechaCorta: string = new Date().toISOString();
  fecha: string = this.fechaCorta;
  minFecha: string = (new Date().getFullYear()-5).toString();
  maxFecha: string = (new Date().getFullYear()+3).toString();
  reservasRef: any = firebase.database().ref('reservas');

  constructor(public navCtrl: NavController,  
              public alertCtrl: AlertController, public af: AngularFire, 
              public actionSheetCtrl: ActionSheetController, 
              public auth:AuthProvider,
              public data:DataProvider) {
    this.usuarios = af.database.list('/usuarios');
    this.reservas = af.database.list('/reservas');
    this.pistas = af.database.list('/pistas');
    this.res = af.database.list('/reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });
    
    //console.log(this.res[0]);
    var horas = ['10','11','12','13','14','15','16','17','18','19','20','21'];
    var pi = [];
    this.pistas.forEach(pista => pi.push(pista[0].nombre));
    //console.log(pi);
    
    //console.log(pi);
    for(var i = 0; i < horas.length; i++){
      var f = [];
      console.log('tamaño ' + pi.length);

      for(var t = 0; t < pi.length; t++){
        console.log('prueba');
        f[t]= pi[t];
      }
      console.log(f);
      this.a.push({clave:horas[i], valor:f});
      
    }
    //console.log("vector antes de definirlo manualmente: " + this.a);
    //var p = ['p1','p2'];
    //this.a = [{clave:horas[0], valor:p}, {clave:horas[1], valor:p}];
    //console.log(this.a);
    
    //console.log(this.a[2]);


    //Ahora elimino las pistas que estan reservadas de las horas reservadas
    
    this.res.forEach(reserva => {
      if(reserva[0] != null){
      //console.log(reserva[0]);
      //console.log('paso 1');
      for(var j = 0; j < this.a.length; j++){
        //console.log('paso 2');
        //console.log('hola ' + this.a[j].clave);
        //console.log('hora inicio de reserva '+ reserva[0].horaInicio)
        if(reserva[0].horaInicio == this.a[j].clave){
          console.log("entra");
          //this.a[j].remove();

          //var pistas = this.a[j].valor;
          var indice = this.a[j].valor.indexOf(reserva[0].nombrePista);
          //console.log(indice);
          if(indice > -1){
            //console.log('valor ' + this.a[j].valor);

            //Con la siguiente linea elimino la pista que está reservada
            //this.a[j].valor.splice(indice,1);
            
          }
          //this.a[j].valor = pistas;
          console.log('eliminado');
          /*var indice = this.a.indexOf(10);
          console.log('indice ' + indice);
          if (indice > -1) {
            this.a.splice(indice, 1);
            console.log("eliminando");
          }*/
          
          //console.log(this.a);
        }
        //console.log(this.a[j].valor);
      }
      }
    }
    
    );
    //console.log(pi);
    //console.log(this.a);

    /*
    var fech = document.getElementById("b");
    console.log(fech);
    console.log(this.fecha);
    var fe = document.getElementById("fe");
    console.log(fe);
    */

  }

  irADatos(){
    this.navCtrl.push(Datos);
  }

  comprobar(hora, inicio, fin){
    
    //Tengo que comprobar aqui toda la lista de reservas que hay puesto que puede haber más de una reserva
    // para la misma pista el mismo día y por lo tanto si en la primera reserva esa pista está disponible
    // pero en la segunda no está disponible, la pista aparecerá como disponible.

    //Me puedo crear un array para cada pista en el que almacenar los verdaderos y los falsos y luego 
    // comprobar si hay algun falso.

    // Me creo un array con todas las horas que voy a introducir y otro con todas las pistas de la aplicacion
    // y luego voy recorriendo las reservas y voy eliminando del array las pistas que estén reservadas
    // en ese día. Una vez eliminadas todas las pistas ocupadas del array, muestro el array en la vista.

    console.log("hora inicio" + inicio);
    console.log("hora fin" + fin);

    var ini = Date.parse(inicio);
    var hor = Date.parse(hora);
    var f = Date.parse(fin);

    if(ini > hor){
      return true;
    }
    else if(ini = hor){
      return false;
    }
    else{
      if(hor > f){
        return false;
      }
      else{
        return true;
      }
    }
  }


  verDia(fecha){
    console.log(fecha);
    console.log(this.res);
    //window.location.reload();
    
    this.res = this.af.database.list('/reservas', {
      query: {
        orderByChild: 'dia',
        equalTo: this.fecha.substr(0,10)
      }
    });
  }

  prueba(){
    var d = document.getElementById("prueba");
    var e = document.createElement("ion-item");
    e.innerHTML = "Elemento de prueba";
    d.appendChild(e);
    
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
    var res = [];
    this.reservasRef.orderByChild('usuario').equalTo(usuario).on("child_added", function(snapshot){
            res.push(snapshot.val().nombre)});

    var user = firebase.auth().currentUser;
    console.log(user.uid);
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
