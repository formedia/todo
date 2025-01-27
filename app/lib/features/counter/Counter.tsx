'use client';

import React, { useEffect } from 'react';
import styles from './Counter.module.css'
import { setValue, decrement, increment, incrementByAmount, selectCount } from './counterSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux';

export function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [amount, setAmount] = React.useState(2);
  useEffect(() => {
    const value = localStorage.getItem('counter') ? Number(localStorage.getItem('counter')) : 0
    dispatch(setValue(value))
    return () => {
      localStorage.setItem('counter', count.toString());
    }

  })


  return (
    <div>
      <h2>Counter</h2>
      <div>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))} />
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +Increment
        </button>
        <span>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -Decrement
        </button>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          -Decrement
        </button>

      </div>
    </div>
  );
}