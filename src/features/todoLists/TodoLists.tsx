import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTodoListsSelector } from 'features/todoLists/todoLists.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import s from './TodoLists.module.scss';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Navigate } from 'react-router-dom';
import { todoListsThunks } from 'features/todoLists/todoListSlice';
import { TodoList } from './TodoList/TodoList';

export const TodoLists = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);
    const todoLists = useAppSelector(getTodoListsSelector);
    useEffect(() => {
        dispatch(todoListsThunks.getTodoLists());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    return (
        <>
            <div className={s.todoListsBody}>
                <div className={s.addTodoItem}>
                    <h2 className={s.title}>Menu</h2>
                    <AddItemForm />
                    <div className={s.todoList}>
                        {todoLists.map((todo) => (
                            <TodoList key={todo.id} {...todo} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
