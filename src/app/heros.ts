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
    idArme : number | null
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

export function comparaisonParNumero (a : HerosId, b : HerosId) : number {
    return a.id - b.id ;
}

export function comparaisonParNom (a : HerosId, b : HerosId) : number {
    return (a.name).localeCompare(b.name) ;
}

export function comparaisonParPoints (a : HerosId, b : HerosId) : number {
    return a.points - b.points ;
}
