import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/lib/features/counter/counterSlice";
import todoReducer from "@/app/lib/features/todoSlice";
import itemReducer from "@/app/lib/features/itemsSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        items: itemReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
