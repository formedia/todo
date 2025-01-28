// selecttodoからのデータを受け取り、表示する
import React from 'react';
import { useAppSelector } from '@/app/lib/hooks/redux';
import { filteredTodos } from '@/app/lib/features/todoSlice';

export default React.memo(function TodoList() {
  const todos = useAppSelector(filteredTodos);
  console.log('todo list', todos);
  return (
    <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
          ))}  
        </ul>
    </div>
  );
})