import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { SkeletonCard } from '../../components/pokemons/SkeletonCard';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContex';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({navigation}: Props) => {
  const { isDark, theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();

  //* Esta es la forma tradicional de una petición http
  // const {isLoading, data: pokemons = [] } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 60, // 60 minutes
  // });

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 60 minutes
    // queryFn: (params) => getPokemons(params.pageParam), // Solo esto es necesario si no quiero cachear los datos de cada pokemon
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />

      {isLoading && !data ? (
        <>
          <Text variant="displayMedium" style={{ marginTop: 20 }}>
            Pokedex
          </Text>

          {[...Array(10)].map((_, index) => (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ))}
        </>
      ) : (
        <FlatList
          data={data?.pages.flat() ?? []}
          keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
          numColumns={2}
          style={{ paddingTop: top + 20 }}
          ListHeaderComponent={() => (
            <Text variant="displayMedium">Pokedex</Text>
          )}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReachedThreshold={0.7}
          onEndReached={() => fetchNextPage()}
          showsVerticalScrollIndicator={false}
          // ItemSeparatorComponent={() => <View style={{marginBottom: 20}} />}
          ListFooterComponent={() =>
            !isLoading && (
              <ActivityIndicator
                size={30}
                color="grey"
                style={{ marginTop: 10, marginBottom: 40 }}
              />
            )
          }
        />
      )}

      <FAB
        style={[globalTheme.fab, { backgroundColor: theme.colors.primary }]}

        icon={() => (
          <Icon name="search-outline" size={25} color={isDark ? 'black' : 'white'} />
        )}
        onPress={() => navigation.push('SearchScreen')}
        mode='elevated'
        color={isDark ? 'black' : 'white'}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -50,
    right: -50,
  },
});
