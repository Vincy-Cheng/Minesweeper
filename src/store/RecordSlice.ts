import { createSlice } from '@reduxjs/toolkit';

interface RecordState {}

const initialState: RecordState = {};

const RecordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {}
});

export const {} = RecordSlice.actions;

export default RecordSlice.reducer;
