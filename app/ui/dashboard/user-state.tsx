'use client';

import { useAppSelector } from '@/app/lib/hooks/redux';
import { selectOwn } from '@/app/lib/features/todoSlice';
import { useSession } from 'next-auth/react'; 

export default function TodoState() {
  const { data: session } = useSession();
  const count = useAppSelector(selectOwn);
  if (!session) {
    return (<p>Loading...</p>);
  } 
  return (
    <div>
      <div>
        <span>{session?.user?.name}</span>
        <span>({count})</span>
      </div>
    </div>
  );
}
