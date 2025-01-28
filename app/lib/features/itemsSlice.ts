import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
}

const itemsSlice = createSlice({
  name: 'items',
  initialState: Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` })) as Item[],
  reducers: {
    deleteItem: (state, action: PayloadAction<number>) => state.filter(item => item.id !== action.payload),
  },
  selectors: {
    selectItems: (state) => state,
  }
});

export const { deleteItem } = itemsSlice.actions;
export const { selectItems } = itemsSlice.selectors;
export default itemsSlice.reducer;