export interface Heros {
    name : string ;
    description : string ;
    image : string ;
    icone : string ;
    attaque : number ;
    esquive : number ;
    degats : number ;
    points : number ;
}

export interface HerosId extends Heros {
    id : number ;
}
