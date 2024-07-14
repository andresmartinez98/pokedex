import { FlatList, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';
import { useQuery } from '@tanstack/react-query';
import { getPokemonsByIds, getPokemonsNameWithId } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const debouncedValue = useDebouncedValue({input: term});

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonsNameWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) { //si es un numero
      const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue));
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length < 3) return [];

    return pokemonNameList.filter(pokemon => 
      pokemon.name.toLocaleLowerCase().includes(debouncedValue.toLocaleLowerCase())
    );

  }, [debouncedValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (<FullScreenLoader />);
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10}]}>
      <TextInput
        placeholder='Search Pokemon'
        mode='flat'
        autoFocus
        onChangeText={setTerm}
        value={term}
      />

    {isLoadingPokemons && (
      <ActivityIndicator style={{paddingTop: 20}} />
    )}

    <FlatList
          data={pokemons}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top + 20 }}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 150}} />}
        />
    </View>
  );
};