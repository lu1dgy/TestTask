import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Change {
  type: string;
  timestamp: number;
}

interface HistoryState {
  changes: Change[];
  lastUpdated: number;
  created: number;
}

const historySlice = createSlice({
  name: 'history',
  initialState: { changes: [], lastUpdated: 0, created: 0 } as HistoryState,
  reducers: {
    addChange: (state, action: PayloadAction<Change>) => {
      state.changes.push(action.payload);
      state.lastUpdated = Date.now();
    },
    clearHistory: (state) => {
      state.changes.splice(0, state.changes.length);
      state.lastUpdated = 0;
    },
  },
});

export const { addChange, clearHistory } = historySlice.actions;

export default historySlice.reducer;
