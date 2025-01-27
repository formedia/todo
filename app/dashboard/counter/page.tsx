'use client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { Counter } from '@/app/lib/features/counter/Counter';

export default function Page() {
  return (
    <Provider store={store}>
        <Counter />
    </Provider>
  );
}