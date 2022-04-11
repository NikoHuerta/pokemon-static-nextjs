import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async (nameOrId: string) => {

    try {
      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
      return {
          id: data.id,
          name: data.name,  
          sprites: data.sprites,
          types: data.types,
          abilities: data.abilities,
          stats: data.stats
        }
    } catch (error) {
        return null;
    }
}
