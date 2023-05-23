import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './index';

export const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
