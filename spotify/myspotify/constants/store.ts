import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// If you want typed hooks:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
