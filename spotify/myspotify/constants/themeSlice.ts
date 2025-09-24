import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',      // 'light' or 'dark'
  accentColor: '#1DB954',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
    },
    setTheme: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { toggleTheme, setAccentColor, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
