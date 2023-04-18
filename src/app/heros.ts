export interface Heros {
    name : string ;
    original : boolean ;
    description : string ;
    image : string ;
    icone : string ;
    points : number ;
    attaque : number ;
    esquive : number ;
    degats : number ;
}

export interface HerosId extends Heros {
    id : number ;
}
