import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTodoListsSelector } from 'features/todoLists/todoLists.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import s from './TodoLists.module.scss';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Navigate } from 'react-router-dom';
import { todoListsThunks } from 'features/todoLists/todoListSlice';
import { TodoList } from './TodoList/TodoList';
import { Tasks } from 'features/todoLists/tasks/Tasks';

export const TodoLists = () => {
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);
    const todoLists = useAppSelector(getTodoListsSelector);
    useEffect(() => {
        dispatch(todoListsThunks.getTodoLists());
    }, []);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

    const addTodoList = (title: string) => {
        dispatch(todoListsThunks.createTodoList({ title }));
    };

    return (
        <>
            <div className={s.todoListsBody}>
                <div className={s.addTodoItem}>
                    <h2 className={s.title}>Menu</h2>
                    <AddItemForm title={'Todo List'} callback={addTodoList} />
                    <div className={s.todoList}>
                        {todoLists.map((todo) => (
                            <TodoList key={todo.id} {...todo} />
                        ))}
                    </div>
                </div>
                <div className={s.todoItem}>
                    <h2 className={s.todoTitle}>
                        Today {`${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`}
                    </h2>
                    <div className={s.taskCreator}>
                        <Tasks />
                    </div>
                </div>
            </div>
        </>
    );
};
