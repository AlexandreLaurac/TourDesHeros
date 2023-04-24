import { Component, OnInit } from '@angular/core' ;

import { HerosId } from "../heros" ;
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
            .subscribe(heros => this.lesHeros = heros) ;
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
}
