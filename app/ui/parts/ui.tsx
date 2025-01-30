import { useState, useEffect } from 'react';
import React from 'react';
import { Modal } from 'app/ui/parts/modal';

type ListProps = {
  items: string[];
  setItems: (items: string[]) => void;
  children: React.ReactNode;
};
export const List: React.FC<ListProps> = React.memo(function ItemList({
  items,
  setItems,
  children,
}) {
  console.log('List rendered');
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState({
    index: null as number | null,
    value: '',
  });
  const handleOpen = (i: number) => {
    setEdit({
      index: i,
      value: items[i],
    });
    setIsOpen(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({
      ...edit,
      value: e.target.value,
    });
  };
  const handleClose = () => setIsOpen(false);
  const handleSave = () => {
    if (edit.index === null) return;
    items[edit.index] = edit.value;
    setItems(items);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') handleClose();
    });
  });

  return (
    <div>
      <p>{children}</p>
      <ul className="flex flex-col space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center space-x-2">
            <span className="text-gray-800">{item}</span>
            <button onClick={() => handleOpen(i)}>Edit</button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isOpen}
        title="Edit Item"
        onClose={handleClose}
        actions={<button onClick={handleSave}>Save</button>}
      >
        <h2>Edit Item</h2>
        {edit.index !== null && (
          <input type="text" value={edit.value} onChange={handleChange} />
        )}
      </Modal>
    </div>
  );
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
};
export const Input: React.FC<Props> = React.memo(function ItemInput({ value, onChange, onAdd }) {
  console.log('Input rendered');
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 p-2"
      />
      <button onClick={onAdd} className="rounded-md border border-gray-300 p-2">
        Add
      </button>
    </div>
  );
})
