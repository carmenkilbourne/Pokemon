
export type Pokemon = {
    id: string,
    name: string,
    abilities: Ability[],
    moves:Move[]
}

export type Ability = {
    name:string,
    effect:string
}

export type Move = {
    name:string,
    power:string
}