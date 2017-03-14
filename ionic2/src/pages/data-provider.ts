import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IThread, IComment } from '../interfaces';

import firebase from 'firebase'

//import * as firebase from 'firebase';
//import * as firebase from 'firebase';
//declare var firebase: any;

@Injectable()
export class DataProvider {
    databaseRef: any = firebase.database();
    usersRef: any = firebase.database().ref('usuarios');
    reservasRef: any = firebase.database().ref('reservas');

    constructor(){

    }

    getDatabaseRef(){
        return this.databaseRef;
    }

    getUsersRef(){
        return this.usersRef;
    }

    getReservasRef(){
        return this.reservasRef;
    }

    getReservasDeUsuario(usuario){

        var res = [];
        this.reservasRef.orderByChild('usuario').equalTo(usuario).on("child_added", function(snapshot){
            res.push(snapshot.key);
            console.log(snapshot.key);
        })
        
        return res;

    }

}