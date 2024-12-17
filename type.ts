
export type Pokemon = {
    id: string,
    name: string,
    abilities: abilitie[],
    moves:move[]
}

type abilitie = {
    name:string,
    efect:string
}

type move = {
    name:string,
    power:string
}