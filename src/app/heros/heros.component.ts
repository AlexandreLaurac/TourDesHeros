import { Component, OnInit } from '@angular/core' ;

import { HerosId } from "../heros" ;
import { comparaisonParNumero, comparaisonParNom, comparaisonParPoints } from "../heros" ;

import { HerosService } from "../heros.service" ;
import { AppComponent } from "../app.component" ;

@Component({
    selector: 'app-heros',
    templateUrl: './heros.component.html',
    styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

    lesHeros : HerosId[] = [] ;
    herosChoisi : HerosId | undefined ;

    constructor (private herosService : HerosService) {}

    ngOnInit() : void {
        this.setLesHeros() ;
        this.herosChoisi = AppComponent.herosChoisi ;
    }

    setLesHeros() : void {
        this.herosService.getLesHeros()
            .subscribe(heros => {
                this.lesHeros = heros ;
                this.triParNumero() ;  // Par défaut, on affiche les héros triés par numéro (nécessaire car l'ordre obtenu de la base de données est un ordre lexicographique sur les id, donc par exemple 10 arrive après 1 et avant 2)
            }) ;
    }

    messageIntroduction() : string {
        let message ;
        if (this.herosChoisi == undefined) {
            message = "Vous n'avez pas encore choisi de héros. Faites-le en vous rendant dans la fiche d'un héros" ;
        }
        else {
            message = "Vous avez choisi un héros, vous pouvez commencer la partie !"
        }
        return message ;
    }

    isCeHerosLeHerosChoisi(heros : HerosId) : boolean {
        return JSON.stringify(heros) === JSON.stringify(this.herosChoisi) ;
    }

    triParNumero() : void {
        this.lesHeros.sort(comparaisonParNumero) ;
    }

    triParNom() : void {
        this.lesHeros.sort(comparaisonParNom) ;
    }

    triParPoints() : void {
        this.lesHeros.sort(comparaisonParPoints) ;
    }
}
