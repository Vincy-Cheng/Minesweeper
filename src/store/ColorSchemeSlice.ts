import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';
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
    toggle: (state, action: PayloadAction<ColorSchemeName>) => {
      if ((action.payload as ColorScheme) === ColorScheme.DARK) {
        state.mode = ColorScheme.LIGHT;
      } else state.mode = ColorScheme.DARK;
    }
  }
});

export const { toggle } = ColorSchemeSlice.actions;

export default ColorSchemeSlice.reducer;
