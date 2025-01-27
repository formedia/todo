import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

interface CounterState { 
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: (create) => ({
    setValue: create.reducer( (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    }),
    increment: create.reducer((state) => {
      state.value += 1;
    }),
    decrement: create.reducer((state) => {
      state.value -= 1;
    }),
    incrementByAmount: create.reducer((state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }),
  }),
  selectors: {
    selectCount: (counter) => counter.value,
  }
});

export const { setValue, increment, decrement, incrementByAmount } = counterSlice.actions;
export const { selectCount } = counterSlice.selectors;
export default counterSlice.reducer;