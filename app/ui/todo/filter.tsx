// ここはfilterだけを表示するコンポーネントです。statusとuser_idでフィルタリングします。
// todoをstatusでフィルタリングする.
// user_idはcheckboxのon, offでフィルタリングする.

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/app/lib/hooks/redux';
import { selectFilter, TodoState, updateFilterStatus, updateFilterUserId } from '@/app/lib/features/todoSlice';

export default function TodoFilter() {
    console.log('todo filter');
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectFilter);
    const changeStatus = (status: TodoState['filter']['status']) => {
        dispatch(updateFilterStatus(status));
    }
    const changeUserId = (checked: boolean) => {
        dispatch(updateFilterUserId(checked));
    }
    return (
        <div>
            <h2>Filter</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        value="all"
                        checked={filter.status === null}
                        onChange={() => changeStatus(null)}
                    />
                    All
                </label>
                <label>
                    <input
                        type="radio"
                        value="pending"
                        checked={filter.status === 'pending'}
                        onChange={() => changeStatus('pending')}
                    />
                    Pending
                </label>
                <label>
                    <input
                        type="radio"
                        value="done"
                        checked={filter.status === 'draft'}
                        onChange={() => changeStatus('draft')}
                    />
                    Draft
                </label>
                <label>
                    <input
                        type="radio"
                        value="closed"
                        checked={filter.status === 'closed'}
                        onChange={() => changeStatus('closed')}
                    />
                    done
                </label>
e
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={filter.user_id !== null}
                        onChange={(e) => changeUserId(e.target.checked)}
                    />
                    Only me
                </label>
            </div>
        </div>
    );
}   

