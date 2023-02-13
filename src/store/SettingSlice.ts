import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
  bombs: number;
  boardSize: { width: number; height: number };
}

const initialState: SettingState = {
  bombs: 10,
  boardSize: { width: 10, height: 10 }
};

const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    updateSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.boardSize.width = action.payload.width;
      state.boardSize.height = action.payload.height;
    },
    updateBombs: (state, action: PayloadAction<number>) => {
      state.bombs = action.payload;
    }
  }
});

export const { updateSize, updateBombs } = SettingSlice.actions;

export default SettingSlice.reducer;
