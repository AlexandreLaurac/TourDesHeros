//import { Arme } from "./arme" ;

export interface Heros {
    name : string ;
    original : boolean ;  // booléen indiquant si le héros est fourni par le site ou a été créé par l'utilisateur
    description : string ;
    image : string ;
    icone : string ;
    points : number ;
    attaque : number ;
    esquive : number ;
    degats : number ;
    idArme : number | undefined
}


export interface HerosId extends Heros {
    id : number ;
}

export function herosIdToHeros (herosId : HerosId) : Heros {
    return {
        name:herosId.name,
        original:herosId.original,
        description:herosId.description,
        image:herosId.image,
        icone:herosId.icone,
        points:herosId.points,
        attaque:herosId.attaque,
        esquive:herosId.esquive,
        degats:herosId.degats,
        idArme:herosId.idArme
    } ;
}

/*
export interface HerosJeu extends HerosId {  // ou 'extends Heros', à voir
    arme : Arme | undefined ;
}
*/
