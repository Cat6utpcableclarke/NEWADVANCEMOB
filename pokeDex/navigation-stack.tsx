import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonListScreen from './screens/pokemon-list';
const RootStack = createNativeStackNavigator({
  screens: {
    pokemonList:{
        screen: PokemonListScreen,
        options: {
            title: 'Pokédex',
            headerShown: true,
        }
    }
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;