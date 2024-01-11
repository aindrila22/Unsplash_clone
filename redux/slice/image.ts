
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PixabayState {
  images: any[];
}

const initialState: PixabayState = {
  images: [],
};

const pixabaySlice = createSlice({
  name: 'pixabay',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<any[]>) => {
      state.images = action.payload;
    },
  },
});

export const { setImages } = pixabaySlice.actions;
export default pixabaySlice.reducer;
