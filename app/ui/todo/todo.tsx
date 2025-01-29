'use client';

// dashboardの右側に表示されるコンテンツを表示するためのレイアウトコンポーネントです
// reduxでtodoを管理して、このページはtodoの追加、一覧表示、削除を行います
import { setUser, setTodos, addTodo, removeTodo, updateTodo, selectFilter, updateFilterStatus, updateFilterUserId } from '@/app/lib/features/todoSlice';
import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/redux';
import { useSession } from 'next-auth/react';
import { useWebSocket } from '@/app/lib/hooks/webSocket';
import { ServerNotification, TodoState, TodoData } from '@/app/lib/definitions';
import { ServerNotificationType as SN, ClientNotificationType as CN } from '@/app/lib/ws_notification_type';
import TodoForm from '@/app/ui/todo/form';
import TodoList from '@/app/ui/todo/list';
import TodoFilter from '@/app/ui/todo/filter';

export default function Todo() {
    console.log('todo 1 page');
    const dispatch = useAppDispatch();

    const { data: session } = useSession();
    useEffect(() => {
        if (session && session.user) {
            dispatch(setUser(session.user));
        }
    }, [session]);


    const {isConnected, sendMessage } = useWebSocket<ServerNotification>("ws://localhost:3001/ws",{
        onMessage: (e) => {
            switch (e.type) {
                case SN.TODOS:
                    if (e.todos) dispatch(setTodos(e.todos));
                    break;
                case SN.ADDED:
                    console.log('added', e.todo);
                    if(e.todo) dispatch(addTodo(e.todo));
                    break;
                case SN.UPDATED:
                    if (e.todo) dispatch(updateTodo({todo: e.todo}));
                    break;
                case 'deleted':
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
            sendMessage(JSON.stringify({type: CN.GET_TODOS, params: filter}))
        }
    }, [filter, isConnected])

    const handleAdd = React.useCallback((content: string, date: Date | null) => {
        const todo = {
            content,
            user_id: session?.user?.id || '',   
            status: 'pending', 
            due_date: date?.toISOString() || null,
            name: session?.user?.name || '',
        }
        sendMessage(JSON.stringify({type: CN.ADD, todo}));
    }, [sendMessage]);

    const handleUpdate = useCallback((todo: TodoData, update: Partial<TodoData> ) => {
        sendMessage(JSON.stringify({type: CN.UPDATE, todo: {...todo, ...update}}));
        dispatch(updateTodo({todo, update}));
    }, [sendMessage]);

    return (
            <div>
                <h1 className="text-2xl font-bold">Todo</h1>
                <TodoForm handleAdd={handleAdd} />
                <hr />
                <TodoFilter />
                <TodoList handleUpdate={handleUpdate} />
            </div>
    );
}   

