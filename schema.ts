export const schema = `#graphql

type pokemon{
    id:ID!
    name:String!
    abilities:[abilitie]!
    moves:[move]!

}

type abilitie{
    name:String!
    efect:String!
}

type move{
    name:String!
    power:String!
}

type Query{
    pokemon(name:String!):pokemon!
    pokemon(id:ID!):pokemon!
}

`