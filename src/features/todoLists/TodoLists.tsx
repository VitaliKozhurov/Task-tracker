import React from 'react';
import { useAppSelector } from 'app/hooks';
import { getTodoListsSelector } from 'features/todoLists/todoLists.selectors';
import { AddTodoListsForm } from 'components/AddTodoListsForm/AddTodoListsForm';
import s from './TodoLists.module.scss';

export const TodoLists = () => {
    const todoLists = useAppSelector(getTodoListsSelector);

    return (
        <>
            <div className={s.todoListsBody}>
                <div className={s.addTodoItem}>
                    <AddTodoListsForm />
                </div>
            </div>
        </>
    );
};
