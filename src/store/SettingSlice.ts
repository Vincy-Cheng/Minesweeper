import { createSlice } from '@reduxjs/toolkit';

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
  reducers: {}
});

export const {} = SettingSlice.actions;

export default SettingSlice.reducer;
