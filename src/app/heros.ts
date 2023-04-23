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
        degats:herosId.degats
    } ;
}
