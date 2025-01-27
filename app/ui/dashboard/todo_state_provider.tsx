'use client';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import UserState from '@/app/ui/dashboard/user-state';

export default function Page() {
  return (
    <Provider store={store}>
        <UserState />
    </Provider>
  );
}