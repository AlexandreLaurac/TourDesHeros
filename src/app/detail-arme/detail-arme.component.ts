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
        return this.arme !== undefined
            && (this.arme.points + this.arme.attaque + this.arme.degats + this.arme.esquive === 0)
            && (this.isPointValide(this.arme.points) && this.isPointValide(this.arme.attaque) && this.isPointValide(this.arme.degats) && this.isPointValide(this.arme.esquive)) ;
    }

    isPointValide(point : number) : boolean {
        return point >= -5 && point <= 5 ;
    }

    goBack() : void {
          this.location.back() ;
    }
}
