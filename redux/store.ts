import { configureStore } from '@reduxjs/toolkit';
import pixabayReducer from './slice/image';
import favoritesReducer from './slice/favorites';


const store = configureStore({
  reducer: {
    images: pixabayReducer,
    favorites: favoritesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;