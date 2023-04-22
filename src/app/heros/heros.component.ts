import { Component, OnInit } from '@angular/core' ;

import { HerosId, HerosJeu } from "../heros" ;
import { HerosService } from "../heros.service" ;
import { AppComponent } from "../app.component" ;
import { ArmeId } from "../arme";

@Component({
    selector: 'app-heros',
    templateUrl: './heros.component.html',
    styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

    lesHeros : HerosId[] = [] ;
    herosChoisi : HerosId | undefined ;
    armeChoisie : ArmeId | undefined ;

    constructor (private herosService : HerosService) {}

    ngOnInit() : void {
        this.setLesHeros() ;
        this.herosChoisi = AppComponent.herosChoisi ;
        this.armeChoisie = AppComponent.armeChoisie ;  // inutile si lien entre arme et heros
    }

    setLesHeros() : void {
        this.herosService.getLesHeros()
            .subscribe(heros => this.lesHeros = heros) ;
    }

    messageIntroduction() : string {
        let message = "" ;
        if (this.herosChoisi == undefined) {
            message = "Vous n'avez pas encore choisi de héros. Faites-le en vous rendant dans la fiche d'un héros" ;
        }
        else if (this.armeChoisie == undefined) {
            message = "Vous avez choisi un héros mais vous ne lui avez pas encore attribué d'arme. Pour cela, rendez-vous dans la partie correspondante"
        }
        return message ;
    }

    isCeHerosLeHerosChoisi(heros : HerosId) : boolean {
        return JSON.stringify(heros) === JSON.stringify(this.herosChoisi) ;
    }
}
