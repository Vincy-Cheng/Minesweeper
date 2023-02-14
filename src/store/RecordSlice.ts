import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Records {
  startDate: string;
  endDate: string;
  size: {
    width: number;
    height: number;
  };
  bombs: number;
  time: number;
}

interface RecordState {
  records: Records[];
}

const initialState: RecordState = {
  records: []
};

const RecordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<Records>) => {
      const record = state.records.find((record) => {
        record.startDate === action.payload.startDate;
      });
      console.log(record);
      if (!record) {
        console.log('push');
        state.records.push({
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          size: { ...action.payload.size },
          bombs: action.payload.bombs,
          time: action.payload.time
        });
      }
    },
    clearRecord: (state) => {
      state.records = [];
    }
  }
});

export const { addRecord, clearRecord } = RecordSlice.actions;

export default RecordSlice.reducer;
