// todoの管理をするためのsliceを作成します
//

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector }  from 'reselect';
import { TodoData, TodoState } from '@/app/lib/definitions';

const initialState: TodoState = {
  todos: [],
  user: null,
  filter: {
    status: null,
    user_id: null
  }
};

type UpdateTodoPayload = {
  todo: TodoData;
  update?: Partial<TodoData>;
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TodoState['user']>) => {
      state.user = action.payload;
    },
    setTodos: (state, action: PayloadAction<TodoData[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoData>) => {
      state.todos.unshift(action.payload);
    },
    removeTodo: (state, action: PayloadAction<TodoData>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { todo, update } = action.payload;
      const i = state.todos.findIndex(t => t.id === todo.id);
      if (i !== -1) {
        state.todos[i] = update ? {...state.todos[i], ...update}: todo;
        console.log('reducel, update', state.todos[i]);
      }
    } ,
    updateFilterStatus: (state, action: PayloadAction<TodoState["filter"]["status"] | null>) => {
      state.filter.status = action.payload;
    },
    updateFilterUserId: (state, action: PayloadAction<Boolean>) => {
      if (state.user) {
        state.filter.user_id = action.payload ? state.user.id : null;
      }
    }
  },
  selectors: {
    selectTodos: (state) => state.todos,
    selectOwn: (state) => state.todos.filter(todo => todo.user_id === state.user?.id).length, 
    selectFilter: (state) => state.filter,
    selectUser: (state) => state.user
  }
});

export const filteredTodos = createSelector(
  [todoSlice.selectors.selectTodos, todoSlice.selectors.selectFilter],
  (todos, filter) => {
    return todos.filter(todo => {
      return (filter.status === null || todo.status === filter.status) && (filter.user_id === null || todo.user_id === filter.user_id);
    });
  }
);


export const { setUser, addTodo, removeTodo, updateTodo, setTodos, updateFilterStatus, updateFilterUserId } = todoSlice.actions;
export const { selectTodos, selectOwn, selectFilter, selectUser } = todoSlice.selectors;
export default todoSlice.reducer;