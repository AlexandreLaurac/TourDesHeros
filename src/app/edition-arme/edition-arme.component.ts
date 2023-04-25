import { Component, OnInit} from '@angular/core';

import { ArmeId } from "../arme" ;
import { ArmeService } from "../arme.service";

import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common' ;

@Component({
    selector: 'app-edition-arme',
    templateUrl: './edition-arme.component.html',
    styleUrls: ['./edition-arme.component.css']
})
export class EditionArmeComponent implements OnInit {

    armeInitiale : ArmeId | undefined ;
    arme : ArmeId | undefined ;
    creation = false ;

    constructor(
        private route : ActivatedRoute,
        private armeService : ArmeService,
        private location : Location
    ) {}

    ngOnInit() : void {
        this.setArme() ;
    }

    setArme() : void {

        // Récupération de l'id de la query string
        const id = Number(this.route.snapshot.paramMap.get('id')) ;

        // Mode création d'une arme
        if (id === 0) {
            this.creation = true ;
            // On récupère l'id le plus haut de la liste pour l'incrémenter de 1 et l'attribuer à l'arme en création
            this.armeService.getArmes()
                .subscribe(armes => {
                    let tableauIdArmes = armes.map(arme => arme.id) ;
                    let idMaxArmes = Math.max(...tableauIdArmes) ;
                    this.arme = {
                        id: idMaxArmes+1,
                        name: "",
                        originale: false,
                        description: "",
                        points: 0,
                        attaque: 0,
                        esquive: 0,
                        degats: 0,
                        image: "",
                        icone: ""
                      } ;
                      this.copieArmeInitiale() ;
                })
        }

        // Mode mise à jour d'un héros
        else {
            this.armeService.getArme(id)
                .subscribe(arme => {
                    this.arme = arme ;
                    this.copieArmeInitiale() ;
                })
        }
    }

    copieArmeInitiale() : void {
        this.armeInitiale = JSON.parse(JSON.stringify(this.arme)) ;
    }

    isArmeModifiee() : boolean {
        return JSON.stringify(this.armeInitiale) !== JSON.stringify(this.arme) ;
    }

    isNomArmeVide() {
        return this.arme === undefined || this.arme.name.length === 0 ;
    }

    arePointsValides() : boolean {
        return this.arme !== undefined
            && (this.arme.points + this.arme.attaque + this.arme.degats + this.arme.esquive === 0)
            && (this.isPointValide(this.arme.points) && this.isPointValide(this.arme.attaque) && this.isPointValide(this.arme.degats) && this.isPointValide(this.arme.esquive)) ;
    }

    isPointValide(point : number) : boolean {
        return point >= -5 && point <= 5 ;
    }

    sauvegarde() : void {
        if (this.arme != undefined) {

            // On est en mode édition et l'arme n'a pas été modifiée : on quitte la page sans enregistrer
            if (!this.creation && !this.isArmeModifiee()) {
                this.retourPagePrecedente() ;
                return ;
            }

            // Mode édition ou création : l'arme a un nom vide - on empêche la sauvegarde et on avertit le joueur
            if (this.isNomArmeVide()) {
                alert ("Vous ne pouvez pas sauvegarder une arme dont le nom est vide - donnez-lui un nom") ;
            }

            // Mode édition ou création : l'arme a des caractéristiques de points incorrectes - idem
            else if (!this.arePointsValides()) {
                alert ("L'arme n'est pas conforme, vous ne pouvez pas la sauvegarder") ;
            }

            // L'arme a un nom non vide et a des points valides, on l'enregistre dans la base (création ou mise à jour)
            else {

                // Mode création - création de l'arme dans la base
                if (this.creation) {
                    this.armeService.createArme(this.arme).then(
                        () => this.retourPagePrecedente(),
                        () => { alert("L'arme n'a pas pu être créée, recommencez") }
                    ) ;
                }

                // Mode mise à jour - mise à jour de l'arme dans la base
                else {
                    this.armeService.updateArme(this.arme).then(
                        () => this.retourPagePrecedente(),
                        () => { console.log("Le héros n'a pas pu être mis à jour, recommencez") }
                    ) ;
                }
            }
        }
    }

    retour() : void {
        // L'arme n'a pas été modifiée, ou elle l'a été et alors on demande confirmation pour quitter la page
        if (!this.isArmeModifiee() || window.confirm("Vous n'avez pas sauvegardé votre arme, voulez-vous vraiment quitter la page ?")) {
            this.retourPagePrecedente() ;
        }
    }

    suppression() : void {
        // On ne peut pas supprimer une arme proposée par le site - seules les armes créées par l'utilisateur peuvent l'être
        if (this.arme !== undefined && !this.arme.originale) {
            if (confirm("Etes-vous sûr de vouloir supprimer cette arme ?")) {
                this.location.historyGo(-2);  // On revient en arrière avant la suppression du héros car sinon la page commence à se mettre à jour et affiche des informations incohérentes
                this.armeService.deleteArme(this.arme.id).then(
                    () => {},
                    () => { console.log("L'arme n'a pas pu être supprimée, recommencez") }
                ) ;
            }
        }
    }

    retourPagePrecedente() : void {
        this.location.back() ;
    }
}
