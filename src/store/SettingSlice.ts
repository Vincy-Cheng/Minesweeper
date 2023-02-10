import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingState {
  bombs: number;
  boardSize: { width: number; height: number };
}

const initialState: SettingState = {
  bombs: 10,
  boardSize: { width: 100, height: 100 }
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
    }
  }
});

export const { updateSize } = SettingSlice.actions;

export default SettingSlice.reducer;
