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

export function armeIdToArme (armeId : ArmeId) : Arme {
    return {
        name:armeId.name,
        originale:armeId.originale,
        description:armeId.description,
        image:armeId.image,
        icone:armeId.icone,
        points:armeId.points,
        attaque:armeId.attaque,
        esquive:armeId.esquive,
        degats:armeId.degats
    } ;
}

export function comparaisonParNumero (a : ArmeId, b : ArmeId) : number {
    return a.id - b.id ;
}

export function comparaisonParNom (a : ArmeId, b : ArmeId) : number {
    return (a.name).localeCompare(b.name) ;
}

export function comparaisonParPoints (a : ArmeId, b : ArmeId) : number {
    return a.points - b.points ;
}
