import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../constants/theme';
import { setAccentColor, setTheme } from '../../constants/themeSlice';
interface RootState {
  theme: {
    mode: string;
    accentColor: string;
  };
}

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const accent = useSelector((state: RootState) => state.theme.accentColor);

  const { colors, styles } = getTheme(mode as any, accent);

  const progress = useSharedValue(mode === 'dark' ? 1 : mode === 'custom' ? 2 : 0);

  useEffect(() => {
    progress.value = withTiming(
      mode === 'dark' ? 1 : mode === 'custom' ? 2 : 0,
      { duration: 500 }
    );
  }, [mode]);

  useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify({ mode, accent }));
  }, [mode, accent]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1, 2],
      ['#fff', '#121212', accent]
    ),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>Theme Switcher</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.lightButtonBg }]}
        onPress={() => dispatch(setTheme({ mode: 'light' }))}
      >
        <Text style={styles.lightButtonText}>Light Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.darkButtonBg }]}
        onPress={() => dispatch(setTheme({ mode: 'dark' }))}
      >
        <Text style={styles.darkButtonText}>Dark Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.accent }]}
        onPress={() => {
          dispatch(setAccentColor('#FF4081')); // Example custom color
          dispatch(setTheme({ mode: 'custom' }));
        }}
      >
        <Text style={styles.customButtonText}>Custom Theme</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ThemeSwitcher;
