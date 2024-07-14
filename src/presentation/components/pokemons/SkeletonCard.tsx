import { Skeleton, VStack, HStack } from 'native-base';
import { View, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContex';

export const SkeletonCard = () => {
  const { isDark } = useContext( ThemeContext );

  return (
    <View style={[styles.cardContainer, {backgroundColor: isDark ? 'grey' : 'white'}]}>
    <HStack
    // marginX={3}
    // h={120}
    flex={1}
    p={3}
    borderWidth="1"
    // space={8}
    overflow="hidden"
    
    rounded="md"
    _dark={{
      borderColor: 'coolGray.500',
    }}
    _light={{
      borderColor: 'coolGray.200',
    }}>
      <VStack w='50%'>
        <Skeleton w="100%" h={3} rounded="md" marginBottom={2} />
        <Skeleton w="20%" h={3} rounded="md" marginBottom='50%' />
        <Skeleton w="50%" h={3} rounded="md" />
      </VStack>
      <Skeleton w={120} h={110} marginLeft={2} rounded="full" position="absolute" bottom={-15} right={-15} />
    </HStack>
    <View style={styles.pokeballContainer}>
        <Image
          source={ isDark
            ? require('../../../assets/pokeball-light.png')
            : require('../../../assets/pokeball-dark.png')
          }
          style={styles.pokeball}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  pokeballContainer: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',
    // width: 110,
    // height: 110,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
});