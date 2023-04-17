import { Component, OnInit } from '@angular/core' ;

import { Heros, HerosId } from "../heros" ;
import { HerosService } from "../heros.service";

import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common' ;

@Component({
  selector: 'app-edition-heros',
  templateUrl: './edition-heros.component.html',
  styleUrls: ['./edition-heros.component.css']
})
export class EditionHerosComponent implements OnInit {

    herosInitial : HerosId | undefined ;
    heros : HerosId | undefined ;
    creation = false ;

    constructor(
        private route : ActivatedRoute,
        private herosService : HerosService,
        private location : Location
    ) {}

    ngOnInit() : void {
        this.setHeros() ;
    }

    setHeros() : void {

        // Récupération de l'id de la query string
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
            this.copieHerosInitial()
        }

        // Mode mise à jour d'un héros
        else {
            this.herosService.getHeros(id)
                .subscribe(heros => {
                    this.heros = heros ;
                    this.copieHerosInitial() ;
                })
        }
    }

    copieHerosInitial() : void {
        this.herosInitial = JSON.parse(JSON.stringify(this.heros)) ;
    }

    isHerosModifie() : boolean {
        return JSON.stringify(this.herosInitial) !== JSON.stringify(this.heros) ;
    }

    isNomHerosVide() {
        return this.heros === undefined || this.heros.name.length === 0 ;
    }

    arePointsValides() : boolean {
        return this.heros != undefined
            && (this.heros.points + this.heros.attaque + this.heros.degats + this.heros.esquive == 40)
            && (this.heros.points >= 1 && this.heros.attaque >= 1 && this.heros.degats >= 1 && this.heros.esquive >= 1) ;
    }

    sauvegarde() : void {
        if (this.heros != undefined) {

            // On est en mode édition et le héros n'a pas été modifié : on quitte la page sans enregistrer
            if (!this.creation && !this.isHerosModifie()) {
                console.log ("je suis passé par ici - mode maj et héros non modifié")
                this.retourPagePrecedente() ;
                return ;
            }

            // Le héros a un nom vide - on empêche la sauvegarde et on avertit le joueur
            if (this.isNomHerosVide()) {
                console.log ("je suis passé par ici - héros modifié avec nom vide")
                alert ("Vous ne pouvez pas sauvegarder un personnage dont le nom est vide - donnez-lui un nom") ;
            }

            // Le héros a des caractéristiques de points incorrectes - idem
            else if (!this.arePointsValides()) {
                console.log ("je suis passé par ici - héros modifié, nom non vide mais points invalides")
                alert ("Le héros n'est pas conforme, vous ne pouvez pas le sauvegarder") ;
            }

            // Le héros a un nom non vide et a des points valides, on l'enregistre dans la base (création ou mise à jour)
            else {

                // Mode création - création du héros dans la base
                if (this.creation) {
                    console.log ("je suis passé par ici - mode maj, héros modifié, tout bon, on enreg")
                    this.herosService.createHeros(this.heros).then(
                        () => this.retourPagePrecedente(),
                        () => { alert("Le personnage n'a pas pu être créé, recommencez") }
                    ) ;
                }

                // Mode mise à jour - mise à jour du héros dans la base
                else {
                    console.log ("je suis passé par ici - mode création, héros modifié, tout bon, on enreg")
                    this.herosService.updateHeros(this.heros).then(
                        () => this.retourPagePrecedente(),
                        () => { console.log("Le héros n'a pas pu être mis à jour, recommencez") }
                    ) ;
                }
            }
        }
    }

    retour() : void {

      // Le personnage n'a pas été modifié ou il l'a été et on demande confirmation pour quitter la page
        if (!this.isHerosModifie() || window.confirm("Vous n'avez pas sauvegardé votre personnage, voulez-vous vraiment quitter la page ?")) {
            this.retourPagePrecedente() ;
        }
    }

    retourPagePrecedente() : void {
        this.location.back() ;
    }
}
