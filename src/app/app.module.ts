import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms" ;
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HerosComponent } from './heros/heros.component';
import { DetailHerosComponent } from './detail-heros/detail-heros.component';
import { MessagesComponent } from './messages/messages.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { EditionHerosComponent } from './edition-heros/edition-heros.component';

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    DetailHerosComponent,
    MessagesComponent,
    TableauDeBordComponent,
    EditionHerosComponent,
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
