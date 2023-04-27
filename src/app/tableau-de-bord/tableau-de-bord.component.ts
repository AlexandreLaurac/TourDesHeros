import { Component, OnInit } from '@angular/core';

import { HerosId } from '../heros';
import { HerosService } from '../heros.service';

@Component({
    selector: 'app-tableau-de-bord',
    templateUrl: './tableau-de-bord.component.html',
    styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {
    lesHeros: HerosId[] = [] ;

    constructor(private herosService : HerosService) {}

    ngOnInit() : void {
        this.setHeros() ;
    }

    setHeros() : void {
        this.herosService.getLesHeros()
            .subscribe(heros => {
                // Classement par points de vie dans l'ordre décroissant et on retient les 5 premiers
                this.lesHeros = heros.sort((a, b) => b.points - a.points).slice(0,5) ;
            }) ;
    }
}
