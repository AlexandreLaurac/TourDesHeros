import { Component } from '@angular/core' ;
import { HerosId } from "./heros" ;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Le Tour des Héros' ;
    static herosChoisi : HerosId | undefined ;
}
