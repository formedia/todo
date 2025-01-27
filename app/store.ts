import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/lib/features/counter/counterSlice";
import todoReducer from "@/app/lib/features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
