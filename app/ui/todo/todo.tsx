'use client';

// dashboardの右側に表示されるコンテンツを表示するためのレイアウトコンポーネントです
// reduxでtodoを管理して、このページはtodoの追加、一覧表示、削除を行います
import { setUser, setTodos, addTodo, removeTodo, updateTodo, selectFilter, TodoData, TodoState, updateFilterStatus, updateFilterUserId } from '@/app/lib/features/todo/todoSlice';
import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux';
import { useSession } from 'next-auth/react';
import { useWebSocket } from '@/app/lib/hooks/webSocket';
import TodoForm from '@/app/ui/todo/form';
import TodoList from '@/app/ui/todo/list';
import TodoFilter from '@/app/ui/todo/filter';

type Message = {
    type: 'todos' | 'delete' | 'added';
    todos?: TodoData[];
    todo?: TodoData;
}
export default function Todo() {
    console.log('todo 1 page');
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (session && session.user) {
            dispatch(setUser(session.user));
        }
    }, [session]);


    const {isConnected, sendMessage } = useWebSocket<Message>("ws://localhost:3001/ws",{
        onMessage: (e) => {
            switch (e.type) {
                case 'todos':
                    if (e.todos) dispatch(setTodos(e.todos));
                    break;
                case 'added':
                    console.log('added', e.todo);
                    if(e.todo) dispatch(addTodo(e.todo));
                    break;
                case 'delete':
                    if (e.todo) {
                        dispatch(removeTodo(e.todo));
                    }
                    break;
            }
        }
    });
    const filter = useAppSelector(selectFilter);
    useEffect(() => {
        console.log('todo 2 page');
        if(isConnected) {
            sendMessage(JSON.stringify({type: 'todos', params: filter}))
        }
    }, [filter, isConnected])

    const handleAdd = React.useCallback((content: string) => {
        const todo = {
            content,
            user_id: session?.user?.id || '',   
            status: 'pending', 
            due_date: null,
            name: session?.user?.name || '',
        }
        sendMessage(JSON.stringify({type: 'add', todo}));
    }, [sendMessage]);

    return (
            <div>
                <h1 className="text-2xl font-bold">Todo</h1>
                <TodoForm handleAdd={handleAdd} />
                <TodoFilter />
                <TodoList />
            </div>
    );
}   

