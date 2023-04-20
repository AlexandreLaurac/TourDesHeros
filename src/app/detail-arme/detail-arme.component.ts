import {Component, OnInit} from '@angular/core';
import { ArmeId } from "../arme";
import { ActivatedRoute } from "@angular/router";
import { ArmeService } from "../arme.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-detail-arme',
  templateUrl: './detail-arme.component.html',
  styleUrls: ['./detail-arme.component.css']
})
export class DetailArmeComponent implements OnInit {

    arme : ArmeId | undefined ;

    constructor(
        private route : ActivatedRoute,
        private armeService : ArmeService,
        private location : Location
    ) {}

    ngOnInit() : void {
        this.setArme() ;
    }

    setArme() : void {
        const id = Number(this.route.snapshot.paramMap.get('id')) ;
        this.armeService.getArme(id)
            .subscribe(arme => {
                this.arme = arme ;
            })
    }

    isArmeValide() : boolean {
        return this.arme != undefined
            && (this.arme.points + this.arme.attaque + this.arme.degats + this.arme.esquive == 10)
            && (this.arme.points >= 1 && this.arme.attaque >= 1 && this.arme.degats >= 1 && this.arme.esquive >= 1) ;
    }

    goBack() : void {
        this.location.back() ;
    }
}
