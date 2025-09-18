import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';
import * as React from 'react';

const { Navigator } = createDrawerNavigator();

// `withLayoutContext` lets Expo Router treat Drawer like a layout
export const Drawer = withLayoutContext(Navigator);

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#1DB954',
        drawerInactiveTintColor: '#fff',
        drawerStyle: { backgroundColor: '#181818' },
        headerStyle: { backgroundColor: '#181818' },
        headerTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="playlist"
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="settings"
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="songs"
        options={{ drawerItemStyle: { display: 'none' }, headerShown: false }}
      />
    </Drawer>
  );
}
