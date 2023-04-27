import { Component, OnInit } from '@angular/core' ;

import { HerosId } from "../heros" ;
import { ArmeId } from "../arme";

import { HerosService } from "../heros.service";
import { ArmeService } from "../arme.service";

import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common' ;

@Component({
    selector: 'app-edition-heros',
    templateUrl: './edition-heros.component.html',
    styleUrls: ['./edition-heros.component.css']
})
export class EditionHerosComponent implements OnInit {

    static SOMME_POINTS : number = 40 ;
    herosInitial : HerosId | undefined ;
    heros : HerosId | undefined ;
    armes : ArmeId[] | undefined ;
    creation = false ;
    pointsRestants : number = EditionHerosComponent.SOMME_POINTS ;

    constructor(
        private route : ActivatedRoute,
        private herosService : HerosService,
        private armeService : ArmeService,
        private location : Location
    ) {}

    ngOnInit() : void {
        this.setHeros() ;
        this.setArmes() ;
    }

    setHeros() : void {

        // Récupération de l'id de la query string
        const id = Number(this.route.snapshot.paramMap.get('id')) ;

        // Mode création d'un héros
        if (id === 0) {
            this.creation = true ;
            // On récupère l'id le plus haut de la liste pour l'incrémenter de 1 et l'attribuer au héros en création
            this.herosService.getLesHeros()
                .subscribe(lesHeros => {
                    let tableauIdHeros = lesHeros.map(herosId => herosId.id) ;
                    let idMaxHeros = Math.max(...tableauIdHeros) ;
                    this.heros = {
                        id:idMaxHeros+1,
                        name: "",
                        original: false,
                        description: "",
                        points: 0,
                        attaque: 0,
                        esquive: 0,
                        degats: 0,
                        image: "",
                        icone: "",
                        idArme:null
                      } ;
                    this.copieHerosInitial() ;
                }) ;
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

    setArmes() : void {
        this.armeService.getArmes()
          .subscribe(armes => this.armes = armes)
    }

    isHerosModifie() : boolean {
        return JSON.stringify(this.herosInitial) !== JSON.stringify(this.heros) ;
    }

    isNomHerosVide() {
        return this.heros === undefined || this.heros.name.length === 0 ;
    }

    calculPointsRestants() : void {
        if (this.heros !== undefined) {
            this.pointsRestants = EditionHerosComponent.SOMME_POINTS - (this.heros.points + this.heros.attaque + this.heros.degats + this.heros.esquive) ;
        }
    }

    arePointsValides() : boolean {
        if (this.heros !== undefined) {
            this.calculPointsRestants() ;
            return (this.pointsRestants === 0)
              && (this.heros.points >= 1 && this.heros.attaque >= 1 && this.heros.degats >= 1 && this.heros.esquive >= 1);
        }
        else {
            return false ;
        }
    }

    sommePointsInferieure() : boolean {
        return this.pointsRestants > 0 ;
    }

    sommePointsSuperieure() : boolean {
        return this.pointsRestants < 0 ;
    }

    isArmeDuHeros(armeId : number | null) : boolean {
        return this.heros?.idArme === armeId ;
    }

    setArmeDuHeros(event : Event) {
        if (this.heros !== undefined && this.armes !== undefined) {
            let nameOfSelectedWeapon = (event.target as HTMLSelectElement).value ;
            if (nameOfSelectedWeapon.trim() === "-- Sans arme --") {
                this.heros.idArme = null ;
            }
            else {
                this.heros.idArme = this.armes.filter(arme => arme.name == nameOfSelectedWeapon)[0].id ;
            }
        }
    }

    sauvegarde() : void {
        if (this.heros != undefined) {

            // On est en mode édition et le héros n'a pas été modifié : on quitte la page sans enregistrer
            if (!this.creation && !this.isHerosModifie()) {
                this.retourPagePrecedente() ;
                return ;
            }

            // Le héros a un nom vide - on empêche la sauvegarde et on avertit le joueur
            if (this.isNomHerosVide()) {
                alert ("Vous ne pouvez pas sauvegarder un personnage dont le nom est vide - donnez-lui un nom") ;
            }

            // Le héros a des caractéristiques de points incorrectes - idem
            else if (!this.arePointsValides()) {
                alert ("Le héros n'est pas conforme, vous ne pouvez pas le sauvegarder") ;
            }

            // Le héros a un nom non vide et a des points valides, on l'enregistre dans la base (création ou mise à jour)
            else {

                // Mode création - création du héros dans la base
                if (this.creation) {
                    this.herosService.createHeros(this.heros).then(
                        () => this.retourPagePrecedente(),
                        () => { alert("Le personnage n'a pas pu être créé, recommencez") }
                    ) ;
                }

                // Mode mise à jour - mise à jour du héros dans la base
                else {
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

    suppression() : void {
        if (this.heros != undefined && !this.heros.original) {
            if (confirm("Etes-vous sûr de vouloir supprimer ce héros ?")) {
                this.location.historyGo(-2);  // On revient en arrière avant la suppression du héros car sinon la page commence à se mettre à jour et affiche des informations incohérentes
                this.herosService.deleteHeros(this.heros.id).then(
                    () => {},
                    () => { console.log("Le héros n'a pas pu être supprimé, recommencez") }
                );
            }
        }
    }

    retourPagePrecedente() : void {
        this.location.back() ;
    }
}
