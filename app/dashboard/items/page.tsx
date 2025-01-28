'use client';
import { deleteItem } from '@/app/lib/features/itemsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux';
import { selectItems } from '@/app/lib/features/itemsSlice';

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items.slice(0, ITEMS_PER_PAGE));
  const [anime, setAnime] = useState(false);

  useEffect(() => {
    setPaginatedItems(items.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
  }, [items, page]);

  const handleDelete = (id: number) => {
    setAnime(true);
    dispatch(deleteItem(id));
    setTimeout(() => {
      setAnime(false);
    }, 500);
  };

  return (
    <div>
      <h1>Items List</h1>
      <AnimatePresence>
        {paginatedItems.map(item => (
          <motion.div
            key={item.id}
            initial={anime ? { opacity: 0, height: 0 } : false}
            animate={anime ? { opacity: 1, height: 'auto' }: false}
            exit={anime ? { opacity: 0, height: 0 }: undefined}
            transition={{duration: 0.3 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <p style={{ marginRight: '10px' }}>{item.name}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div>
        <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page => page + 1)} disabled={page * ITEMS_PER_PAGE >= items.length}>
          Next
        </button>
      </div>
    </div>
  );
}
