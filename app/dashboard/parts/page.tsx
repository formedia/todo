'use client';

import { List, Input } from 'app/ui/parts/ui';
import { useState, useCallback, useMemo } from 'react';
import { UsersList } from 'app/ui/parts/users';
import VirtualizedTable from '@/app/ui/parts/virtualized_table';

const generateData = () => {
  console.log('generateData');
  const data = [];
  for (let i = 1; i <= 10000; i++) {
    data.push({ id: i, name: `User ${i}`, email: `user${i}@example.com` });
  }
  return data;
};

export default function PartsPage() {
  console.log('partsPage rendered');
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  // const increment = () => setCount(prev => prev + 1);
  const handleAdd = useCallback(() => {
    setItems([...items, input]);
    setInput('');
  }, [input]);
  const origin = useMemo(() => generateData(), [])
  const [search, setSearch] = useState('');
  const [data, setData] = useState(origin);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setData(
      origin.filter((item) => item.name.includes(e.target.value))
    );
  };


  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-full max-w-[400px] p-4">
        <h1 className="text-2xl font-bold">Todo List: {count}</h1>
        <Input value={input} onChange={setInput} onAdd={handleAdd} />
        <List items={items} setItems={setItems}>
          yanda
        </List>
      </div>

      <div className="w-full max-w-[400px] p-4">
        <UsersList onClick={increment} />
      </div>

      <div className="w-full max-w-[400px] p-4">
        <input onChange={onSearch} value={search} />
        <VirtualizedTable data={data} />
      </div>
    </main>
  );
}
