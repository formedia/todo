'use client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Todo from '@/app/ui/todo/todo';

export default function TodoProvider() {
  console.log('todo provider');
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}
