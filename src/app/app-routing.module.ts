import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableauDeBordComponent } from "./tableau-de-bord/tableau-de-bord.component";
import { HerosComponent } from './heros/heros.component' ;
import { DetailHerosComponent } from './detail-heros/detail-heros.component';
import { EditionHerosComponent } from "./edition-heros/edition-heros.component";
import { ArmesComponent } from "./armes/armes.component";
import { DetailArmeComponent } from "./detail-arme/detail-arme.component";
import { EditionArmeComponent } from "./edition-arme/edition-arme.component";

const routes: Routes = [
    { path: '', redirectTo: '/tableauDeBord', pathMatch: 'full' },
    { path: 'tableauDeBord', component: TableauDeBordComponent },
    { path: 'heros', component: HerosComponent },
    { path: 'detail/:id', component: DetailHerosComponent },
    { path: 'editionHeros/:id', component: EditionHerosComponent },
    { path: 'armes', component: ArmesComponent },
    { path: 'detailArme/:id', component : DetailArmeComponent },
    { path: 'editionArme/:id', component : EditionArmeComponent }
] ;

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
