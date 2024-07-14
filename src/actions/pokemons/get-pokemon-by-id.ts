import { pokeApi } from '../../config/api/pokeApi';
import { Pokemon } from '../../domain/entities/pokemon';
import type { PokeAPIPokemon } from '../../infrastructure/interfaces/pokeapi.interfaces';
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mappers';

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  try {
    const url = `/pokemon/${id}`;
    const { data } = await pokeApi.get<PokeAPIPokemon>(url);

    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;
  
  } catch (error) {
    throw new Error(`Error getting pokemon by id: ${id}`);
  }
};
