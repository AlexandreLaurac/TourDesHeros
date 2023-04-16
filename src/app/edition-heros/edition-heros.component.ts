import { Component, OnInit } from '@angular/core' ;

import  { HerosId } from "../heros" ;
import { HerosService } from "../heros.service";

import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common' ;

@Component({
  selector: 'app-edition-heros',
  templateUrl: './edition-heros.component.html',
  styleUrls: ['./edition-heros.component.css']
})
export class EditionHerosComponent implements OnInit {

    heros : HerosId | undefined ;
    creation = false ;
    sauve = false ;

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

        // Mode création d'un héros
        if (id === 0) {
            this.creation = true ;
            // Ici récupérer l'id le plus haut de la liste pour l'incrémenter de 1 et l'attribuer au héros en création
            this.heros = {
                id:100,
                name:"test",
                description:"test",
                points:0,
                attaque:0,
                esquive:0,
                degats:0,
                image:"",
                icone:""
            } ;
        }

        // Mode mise à jour d'un héros
        else {
          this.herosService.getHeros(id)
              .subscribe(heros => this.heros = heros)
        }
    }

    isHerosValide() : boolean {
        return this.heros != undefined
            && (this.heros.points + this.heros.attaque + this.heros.degats + this.heros.esquive == 40)
            && (this.heros.points >= 1 && this.heros.attaque >= 1 && this.heros.degats >= 1 && this.heros.esquive >= 1) ;
    }

    sauvegarde() : void {
        if (this.heros != undefined) {

            // Le héros n'est pas valide, on empêche la sauvegarde
            if (!this.isHerosValide()) {
                alert ("Le héros n'est pas conforme, vous ne pouvez pas le sauvegarder") ;
            }

            // Le héros est valide, on l'enregistre dans la base (création ou mise à jour)
            else {
                // Mode création
                if (this.creation) {
                    // Création du héros dans la base
                    this.herosService.createHeros(this.heros).then(
                        () => {
                            this.sauve = true ;
                            this.retour() ;
                        },
                        () => { alert("le personnage n'a pas pu être enregistré dans la base, recommencez") }
                    ) ;
                }
                // Mode mise à jour
                else {
                    // Mise à jour du héros dans la base
                    this.herosService.updateHeros(this.heros).then(
                        () => {
                            this.sauve = true ;
                            this.retour()
                        },
                        () => { console.log("mise à jour du héros impossible") }
                    );
                }
            }
        }
    }

    retour() : void {

        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////// PROBLEME : ON PEUT PARTIR MEME SI LE HEROS N'EST PAS VALIDE !!! ////////////
        //////////////////////////////////////////////////////////////////////////////////////////

        // De même, si on n'a rien modifié, on nous demande si on veut la quitter

        // Le personnage n'est pas sauvegardé, affichage d'une dialog avec demande de confirmation
        if (!this.sauve) {
            if (!window.confirm("Vous n'avez pas sauvegardé votre personnage, voulez-vous vraiment quitter la page ?")) {
                return ;
            }
        }
        // Le personnage a été sauvegardé ou confirmation de départ de la page
        this.location.back() ;
    }
}
