import { Component, OnInit } from '@angular/core' ;
import { AppComponent } from "../app.component" ;

import { HerosId, HerosJeu } from "../heros" ;

import { ActivatedRoute } from '@angular/router' ;
import { Location } from '@angular/common' ;
import { HerosService } from '../heros.service' ;

@Component({
    selector: 'app-detail-heros',
    templateUrl: './detail-heros.component.html',
    styleUrls: ['./detail-heros.component.css']
})
export class DetailHerosComponent implements OnInit {

    heros : HerosId | undefined ;

    constructor(
        private route : ActivatedRoute,
        private herosService : HerosService,
        private location : Location
    ) {}

    ngOnInit() : void {
        this.setHeros() ;
    }

    setHeros() : void {
        const id = Number(this.route.snapshot.paramMap.get('id')) ;
        this.herosService.getHeros(id)
            .subscribe(heros => {
                this.heros = heros ;
            })
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
            if (!this.isCeHerosLeHerosChoisi()) {
                message = "Choisir ce héros !" ;
            }
            else {
                message = "Retirer ce héros" ;
            }
        }
        return message ;
    }

    choisirHeros() : void {
        if (this.heros != undefined) {
            if (!this.isCeHerosLeHerosChoisi()) {
                AppComponent.herosChoisi = this.heros ;
            }
            else {
                AppComponent.herosChoisi = undefined ;
            }
        }
        else {
            alert('Une erreur est survenue, veuillez recommencer') ;
        }
        this.retour() ;
    }
}
