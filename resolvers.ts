import { Pokemon, Ability, Move } from "./types.ts";
import { GraphQLError } from "graphql";

export const resolvers = {
  Pokemon: {
    id: (parent: Pokemon) => parent.id,
    name: (parent: Pokemon) => parent.name,
    abilities: (parent: Pokemon) => parent.abilities,
    moves: (parent: Pokemon) => parent.moves,
  },
  Query: {
    pokemon: async (
      _: unknown,
      { id, name }: { id: string; name: string },
    ): Promise<Pokemon | null> => {
      try {
        let parametro = "";
        if (id) {
          parametro = `https://pokeapi.co/api/v2/pokemon/${id}`;
        } else if (name) {
          parametro = `https://pokeapi.co/api/v2/pokemon/${name}`;
        } else {
          throw new GraphQLError("No se ha encontrado el ID o nombre del Pokémon.");
        }
        const ApiResponse = await fetch(parametro);
        if (!ApiResponse) {
          throw new GraphQLError("Pokémon no encontrado");
        }

        const PokemonData = await ApiResponse.json();

        const PokemonAbilities: Ability[] = await Promise.all(
          PokemonData.abilities.map(async (ability) => {
            const abiliti = await fetch(ability.ability.url);
            const abilityInfo = await abiliti.json();

            return {
              name: ability.ability.name,
              effect: abilityInfo.effect_entries
                .map((entry) => entry.effect)
                .join(),
            };
          })
        );

        const PokemonMoves: Move[] = PokemonData.moves.map((move) => ({
          name: move.move.name,
          power: move.move.power, 
        }));

        return {
          id: PokemonData.id.toString(),
          name: PokemonData.name,
          abilities: PokemonAbilities,
          moves: PokemonMoves
        };
      } catch {
        throw new GraphQLError("No existe el pokemon");
      }
    },
  },
};
