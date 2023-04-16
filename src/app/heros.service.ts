import { Injectable } from '@angular/core' ;

import { Heros, HerosId } from "./heros" ;
import { MessageService } from "./message.service" ;

import { map, Observable } from "rxjs" ;
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore" ;

@Injectable({
  providedIn: 'root'
})
export class HerosService {

    private static url : string = 'LesHeros' ;

    //private collectionDesHeros : AngularFirestoreCollection<Heros> | undefined ;

    constructor(private messageService : MessageService, private afs : AngularFirestore) {
        //this.collectionDesHeros = this.afs.collection(HerosService.url) ;
    }

    getLesHeros(): Observable<HerosId[]> {
        let collectionDesHeros = this.afs.collection<Heros>(HerosService.url) ;
        let lesHeros : Observable<HerosId[]> = collectionDesHeros.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data : Heros = a.payload.doc.data() as Heros ;
                const id : number = Number(a.payload.doc.id) ;
                return {id, ...data} ;
            }))
        ) ;
        this.messageService.add('HerosService : héros reçus') ;
        return lesHeros ;
    }

    getHeros(id: number): Observable<HerosId> {
        let documentDeHeros = this.afs.collection<Heros>(HerosService.url).doc(id.toString()) ;
        let heros : Observable<HerosId> = documentDeHeros.snapshotChanges().pipe(
            map(action => {
                const data: Heros = action.payload.data() as Heros ;
                const id: number = Number(action.payload.id)
                return {id, ...data} ;
            })) ;
        this.messageService.add(`HeroService: fetched hero id=${id}`) ;
        return heros ;
    }

    createHeros(herosId : HerosId) : Promise<void> {
        let documentDeHeros = this.afs.collection<Heros>(HerosService.url).doc(herosId.id.toString()) ;
        let heros : Heros = {
            name:herosId.name,
            description:herosId.description,
            image:herosId.image,
            icone:herosId.icone,
            points:herosId.points,
            attaque:herosId.attaque,
            esquive:herosId.esquive,
            degats:herosId.degats
        } ;
        return documentDeHeros.set(heros) ;
    }

    updateHeros(herosId : HerosId) : Promise<void> {
        let documentDeHeros = this.afs.collection<Heros>(HerosService.url).doc(herosId.id.toString()) ;
        let heros : Heros = {
            name:herosId.name,
            description:herosId.description,
            image:herosId.image,
            icone:herosId.icone,
            points:herosId.points,
            attaque:herosId.attaque,
            esquive:herosId.esquive,
            degats:herosId.degats
        } ;
        return documentDeHeros.update(heros) ;
    }
}
