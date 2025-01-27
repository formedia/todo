'use client';
// taskを追加するform, taskのcontentを入力するinputとsubmitボタンがある
// submitすると、taskを追加するmutationが実行される
import React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux';
import { addTodo } from '@/app/lib/features/todo/todoSlice';

interface TodoFormProps {
    handleAdd: (content: string) => void;
}

export default React.memo(function TodoForm({ handleAdd }: TodoFormProps) {
    console.log('todo form');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAdd(content);
        setContent('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
})