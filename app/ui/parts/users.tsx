import React from 'react';

const users = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'David' },
  { name: 'Eve' },
  { name: 'Frank' },
  { name: 'Grace' },
  { name: 'Hank' },
  { name: 'Ivy' },
  { name: 'Jack' },
];

export const UsersList: React.FC<{onClick: () => void}> = React.memo( function UserList ({onClick} ) {
  console.log('UsersList rendered');
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
        <button onClick={onClick}>Click me</button>
    </div>
  );
});
