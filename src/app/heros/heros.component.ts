import { Component, OnInit } from '@angular/core' ;

import { HerosId } from "../heros" ;
import { HerosService } from "../heros.service" ;

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {

    lesHeros : HerosId[] = [] ;

    constructor (private herosService : HerosService) {}

    ngOnInit() : void {
        this.setLesHeros() ;
    }

    setLesHeros() : void {
        this.herosService.getLesHeros()
            .subscribe(heros => this.lesHeros = heros) ;
    }
}
