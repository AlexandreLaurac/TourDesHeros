import { Component, OnInit } from '@angular/core' ;

import { ArmeId } from "../arme" ;
import { comparaisonParNom, comparaisonParNumero, comparaisonParPoints } from "../arme" ;

import { ArmeService } from "../arme.service" ;

@Component({
    selector: 'app-armes',
    templateUrl: './armes.component.html',
    styleUrls: ['./armes.component.css']
})
export class ArmesComponent implements OnInit {
    armes : ArmeId[] = [] ;

    constructor (private armeService : ArmeService) {}

    ngOnInit() : void {
        this.setArmes() ;
    }

    setArmes() : void {
        this.armeService.getArmes()
            .subscribe(armes => {
                this.armes = armes ;
                this.triParNumero() ;  // Par défaut, tri par numéro (voir remarque dans le composant Heros)
            }) ;
    }

    triParNumero() : void {
        this.armes.sort(comparaisonParNumero) ;
    }

    triParNom() : void {
        this.armes.sort(comparaisonParNom) ;
    }

    triParPoints() : void {
        this.armes.sort(comparaisonParPoints) ;
    }
}
