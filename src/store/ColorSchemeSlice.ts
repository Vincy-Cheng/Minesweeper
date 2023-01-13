import { createSlice } from '@reduxjs/toolkit';
import { ColorScheme } from '../enum';

type ColorSchemeState = {
  mode: ColorScheme;
};

const initialState: ColorSchemeState = {
  mode: ColorScheme.LIGHT
};

const ColorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    toggle: (state) => {
      if (state.mode === ColorScheme.DARK) {
        state.mode = ColorScheme.LIGHT;
      } else {
        state.mode = ColorScheme.DARK;
      }
    }
  }
});

export const { toggle } = ColorSchemeSlice.actions;

export default ColorSchemeSlice.reducer;
