import { configureStore } from '@reduxjs/toolkit';
import pixabayReducer from './slice/image';


const store = configureStore({
  reducer: {
    images: pixabayReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;