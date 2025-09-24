// src/theme.ts
import { StyleSheet } from 'react-native';

type Mode = 'light' | 'dark' | 'custom';

export const getTheme = (mode: Mode, accent: string) => {
  const isDark = mode === 'dark';
  const isCustom = mode === 'custom';

  const background = isCustom ? accent : isDark ? '#121212' : '#fff';
  const text = isDark ? '#fff' : '#121212';
  const card = isDark ? '#181818' : '#f5f5f5';
  const description = isDark ? '#b3b3b3' : '#555';

  return {
    colors: {
      background,
      text,
      accent,
      card,             // <── added
      description,      // <── added
      lightButtonBg: '#eee',
      darkButtonBg: '#222',
    },
    styles: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        color: text,
      },
      button: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
      },
      lightButtonText: {
        color: '#121212',
      },
      darkButtonText: {
        color: '#fff',
      },
      customButtonText: {
        color: '#fff',
      },
    }),
  };
};
