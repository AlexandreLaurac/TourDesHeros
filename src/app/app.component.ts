import { Component } from '@angular/core' ;
import { HerosId } from "./heros" ;
import { ArmeId } from "./arme" ;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Le Tour des Héros' ;
    static herosChoisi : HerosId | undefined ;
    static armeChoisie : ArmeId | undefined ;
}
