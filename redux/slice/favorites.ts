
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    fetchFavorites: (state, action: PayloadAction<any>) => {
        return action.payload.favorites;
      },
  },
});

export const { fetchFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
