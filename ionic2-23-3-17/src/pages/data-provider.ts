import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IThread, IComment } from '../interfaces';

import firebase from 'firebase';

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

    getReservasDeUsuario(usuario) : Promise<string[]> {
        var res = [];
        this.reservasRef.orderByChild('usuario').equalTo(usuario).on("child_added", function(snapshot){
            res.push(snapshot.val().nombre);
            //console.log(snapshot.val().nombre);    
        }).then((data) => res = data);       
        return Promise.resolve(res);

/* Aquí solo me muestra la función snapshot.val().nombre
        return new Promise<[string]>((resolve) => {
            var r = this.reservasRef.orderByChild('usuario').equalTo(usuario).on("child_added", function(snapshot){
                res.push(snapshot.val().nombre)});
            resolve(r);
        })
*/
    }


}



