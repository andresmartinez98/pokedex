import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "../../infrastructure/interfaces/pokeapi.interfaces";

export const getPokemonsNameWithId = async () => {
  const url = `pokemon?limit=1000`;

  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

  return data.results.map((item) => ({
    id: Number(item.url.split("/")[6]),
    name: item.name,
  }));
}