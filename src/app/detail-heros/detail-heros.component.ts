import { Component, OnInit } from '@angular/core';

import { HerosId } from "../heros" ;

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

    goBack() : void {
        this.location.back() ;
    }
}
