import React from 'react';
import { useAppSelector } from 'app/hooks';
import { getTodoListsSelector } from 'features/todoLists/todoLists.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import s from './TodoLists.module.scss';

export const TodoLists = () => {
    const todoLists = useAppSelector(getTodoListsSelector);

    return (
        <>
            <div className={s.todoListsBody}>
                <div className={s.addTodoItem}>
                    <AddItemForm />
                </div>
            </div>
        </>
    );
};
