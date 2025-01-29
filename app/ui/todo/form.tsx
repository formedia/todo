'use client';
// taskを追加するform, taskのcontentを入力するinputとsubmitボタンがある
// submitすると、taskを追加するmutationが実行される
import React from 'react';
import { useState } from 'react';
import { CalendarDaysIcon, XCircleIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

interface TodoFormProps {
  handleAdd: (content: string, date: Date | null) => void;
}

const toLocal = function (date: Date | null): string | null {
  return date ? moment(date).format('YYYY-MM-DD') : null;
};

export default React.memo(function TodoForm({ handleAdd }: TodoFormProps) {
  console.log('todo form');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setDate(date);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    handleAdd(content, date);
    setContent('');
    setDate(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-2 text-xs">
          <input
            className="rounded-md border border-gray-300 py-[5px] text-xs"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mt-1 flex justify-between gap-2">
          <span className="flex items-center text-xs">
            <DatePicker
              selected={date ? date : new Date()}
              onChange={handleChange}
              dateFormat="yyyy-MM-dd"
              customInput={<CalendarDaysIcon className="w-6 pt-1" />}
            />
            {date ? (
              <>
                締切: {toLocal(date)}
                <button onClick={() => setDate(null)} type="button">
                  <XCircleIcon className="w-6" />
                </button>
              </>
            ) : (
              <> 締切日</>
            )}
          </span>
          <button
            className="rounded-md border border-gray-300 px-2 py-[5px] text-xs"
            disabled={!content}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
});
