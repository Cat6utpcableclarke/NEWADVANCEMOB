import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../constants/store'; // adjust path if needed

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
        <Stack initialRouteName="login">
          <Stack.Screen name="(drawer)" options={{ title: 'My Drawer', headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="greet" options={{ headerShown: false }} />
          <Stack.Screen name="test1" options={{ title: 'Test 1', headerShown: true }} />
          <Stack.Screen name="component-showcase" options={{ title: 'Component Showcase', headerShown: true }} />
        </Stack>
    </Provider>
  );
}
