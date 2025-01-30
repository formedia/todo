// selecttodoからのデータを受け取り、表示する
import React from 'react';
import { useAppSelector } from '@/app/lib/hooks/redux';
import { filteredTodos, selectUser } from '@/app/lib/features/todoSlice';
import { TodoData } from '@/app/lib/definitions';

interface StatusButtonProps {
  todo: TodoData;
  user_id: string;
  handleStatus: (todo: TodoData, status: TodoData['status']) => void;
}
const StatusButton = ({ todo, user_id, handleStatus }: StatusButtonProps) => {
  if (user_id !== todo.user_id)
    return (
      <button type="button" disabled={true}>
        {todo.status === 'pending' ? <span>⬜️</span> : <span>✅</span>}
      </button>
    );
  return (
    <>
      {todo.status === 'pending' ? (
        <button
          type="button"
          className="group"
          onClick={() => handleStatus(todo, 'closed')}
          aria-label="Mark as completed"
        >
          <span className="group-hover:hidden">⬜️</span>
          <span className="hidden group-hover:inline-block">✅</span>
        </button>
      ) : (
        <button
          type="button"
          className="group"
          onClick={() => handleStatus(todo, 'pending')}
          aria-label="Mark as pending"
        >
          <span className="group-hover:hidden">✅</span>
          <span className="hidden group-hover:inline-block">⬜️</span>
        </button>
      )}
    </>
  );
};

interface TodoListProps {
  handleUpdate: (todo: TodoData, update: Partial<TodoData>) => void;
}

export default React.memo(function TodoList({ handleUpdate }: TodoListProps) {
  const todos = useAppSelector(filteredTodos);
  const user = useAppSelector(selectUser);
  console.log('todo list', todos);
  const handleStatus = (todo: TodoData, status: TodoData['status']) => {
    handleUpdate(todo, { status });
  };

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p className="text-sm">
              <StatusButton todo={todo} user_id={user?.id || ''} handleStatus={handleStatus} />
              {todo.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
});
