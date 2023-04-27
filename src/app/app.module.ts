import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms" ;
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { HerosComponent } from './heros/heros.component';
import { DetailHerosComponent } from './detail-heros/detail-heros.component';
import { EditionHerosComponent } from './edition-heros/edition-heros.component';
import { ArmesComponent } from './armes/armes.component';
import { DetailArmeComponent } from './detail-arme/detail-arme.component';
import { EditionArmeComponent } from './edition-arme/edition-arme.component';

import { AbsoluteValuePipe } from "./absolute-value.pipe" ;

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";

@NgModule({
    declarations: [
        AppComponent,
        MessagesComponent,
        TableauDeBordComponent,
        HerosComponent,
        DetailHerosComponent,
        EditionHerosComponent,
        ArmesComponent,
        DetailArmeComponent,
        EditionArmeComponent,
        AbsoluteValuePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
    ],
    providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
    bootstrap: [AppComponent]
})
export class AppModule { }
