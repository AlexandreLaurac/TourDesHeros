export interface Arme {
    name : string ;
    originale : boolean ;
    description : string ;
    image : string ;
    icone : string ;
    points : number ;
    attaque : number ;
    esquive : number ;
    degats : number ;
}

export interface ArmeId extends Arme {
    id : number ;
}
