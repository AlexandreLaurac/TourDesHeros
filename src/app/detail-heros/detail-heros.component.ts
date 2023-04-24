import { Component, OnInit } from '@angular/core' ;
import { AppComponent } from "../app.component" ;

import { HerosId } from "../heros" ;
import { ArmeId } from "../arme" ;

import { ActivatedRoute } from '@angular/router' ;
import { Location } from '@angular/common' ;

import { HerosService } from '../heros.service' ;
import { ArmeService } from "../arme.service";

@Component({
    selector: 'app-detail-heros',
    templateUrl: './detail-heros.component.html',
    styleUrls: ['./detail-heros.component.css']
})
export class DetailHerosComponent implements OnInit {

    heros : HerosId | undefined ;
    arme : ArmeId | undefined ;

    constructor(
        private route : ActivatedRoute,
        private location : Location,
        private herosService : HerosService,
        private armeService : ArmeService
    ) {}

    ngOnInit() : void {
        this.setHeros() ;
    }

    setHeros() : void {
        const id = Number(this.route.snapshot.paramMap.get('id')) ;
        this.herosService.getHeros(id)
            .subscribe(heros => {
                this.heros = heros ;
                this.setArmeDuHeros() ;
            })
    }

    setArmeDuHeros() : void {
        if (this.heros?.idArme !== undefined) {
            this.armeService.getArme(this.heros?.idArme)
                .subscribe(arme => {
                    this.arme = arme ;
                }
            )
        }
    }

    isHerosValide() : boolean {
        return this.heros != undefined
            && (this.heros.points + this.heros.attaque + this.heros.degats + this.heros.esquive == 40)
            && (this.heros.points >= 1 && this.heros.attaque >= 1 && this.heros.degats >= 1 && this.heros.esquive >= 1) ;
    }

    isCeHerosLeHerosChoisi() : boolean {
        return JSON.stringify(AppComponent.herosChoisi) == JSON.stringify(this.heros) ;
    }

    retour() : void {
        this.location.back() ;
    }

    texteBoutonChoixHeros() : string {
        let message = "" ;
        if (this.heros != undefined) {
            // Ce héros n'est pas le héros choisi, on propose de le choisir à la place
            if (!this.isCeHerosLeHerosChoisi()) {
                message = "Choisir ce héros !" ;
            }
            // Ce héros est le héros choisi, on propose de le retirer
            else {
                message = "Retirer ce héros" ;
            }
        }
        return message ;
    }

    choisirHeros() : void {
        if (this.heros != undefined) {
            // Ce héros n'est pas le héros choisi...
            if (!this.isCeHerosLeHerosChoisi()) {
                // ...On vérifie d'abord s'il a une arme
                if (this.heros.idArme === undefined) { // il n'en a pas
                    alert ("Vous devez d'abord attribuer une arme à ce héros pour le choisir. Rendez-vous dans la page d'édition pour cela.") ;
                }
                else {  // il en a une
                    AppComponent.herosChoisi = this.heros ;
                }
            }
            // Ce héros est déjà le héros choisi, on le retire
            else {
                AppComponent.herosChoisi = undefined ;
            }
        }
        else {
            alert ('Une erreur est survenue, veuillez recommencer') ;
        }
        this.retour() ;
    }
}
