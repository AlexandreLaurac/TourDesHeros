import { Injectable } from '@angular/core' ;

import { Arme, ArmeId } from "./arme" ;
import { MessageService } from "./message.service" ;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArmeService {

    private static url : string = 'Armes' ;
    //private collectionDesArmes : AngularFirestoreCollection<Armes> | undefined ;

    constructor (private messageService : MessageService, private afs : AngularFirestore) {
        //this.collectionDesArmes = this.afs.collection(ArmeService.url) ;
    }

    createArme (armeId : ArmeId) : Promise<void> {
        let documentArme = this.afs.collection<Arme>(ArmeService.url).doc(armeId.id.toString()) ;
        let arme : Arme = {
            name:armeId.name,
            original:armeId.original,
            description:armeId.description,
            image:armeId.image,
            icone:armeId.icone,
            points:armeId.points,
            attaque:armeId.attaque,
            esquive:armeId.esquive,
            degats:armeId.degats
        } ;
        return documentArme.set(arme) ;
    }

    getArmes() : Observable<ArmeId[]> {
        let collectionDesArmes = this.afs.collection<Arme>(ArmeService.url) ;
        let armes : Observable<ArmeId[]> = collectionDesArmes.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data : Arme = a.payload.doc.data() as Arme ;
              const id : number = Number(a.payload.doc.id) ;
              return {id, ...data} ;
            }))
        ) ;
        this.messageService.add('ArmeService : armes reçues') ;
        return armes ;
    }

    getArme (id : number) : Observable<ArmeId> {
        let documentArme = this.afs.collection<Arme>(ArmeService.url).doc(id.toString()) ;
        let arme : Observable<ArmeId> = documentArme.snapshotChanges().pipe(
            map(action => {
                const data : Arme = action.payload.data() as Arme ;
                const id : number = Number(action.payload.id) ;
                return {id, ...data} ;
              })) ;
        this.messageService.add(`ArmeService: reçu arme id=${id}`) ;
        return arme ;
    }

    updateArme (armeId : ArmeId) : Promise<void> {
        let documentArme = this.afs.collection<Arme>(ArmeService.url).doc(armeId.id.toString()) ;
        let arme : Arme = {
            name:armeId.name,
            original:armeId.original,
            description:armeId.description,
            image:armeId.image,
            icone:armeId.icone,
            points:armeId.points,
            attaque:armeId.attaque,
            esquive:armeId.esquive,
            degats:armeId.degats
        } ;
        return documentArme.update(arme) ;
    }

    deleteArme (id : number) : Promise<void> {
        let documentArme = this.afs.collection<Arme>(ArmeService.url).doc(id.toString()) ;
        return documentArme.delete() ;
    }
}
