import React, { useEffect } from 'react';
import s from './TodoListsList.module.scss';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { TodoList } from 'features/todoLists/TodoListsList/TodoList/TodoList';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTodoListsSelector } from 'features/todoLists/todoLists.selectors';
import { todoListsThunks } from 'features/todoLists/todoListSlice';

export const TodoListsList = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(getTodoListsSelector);
    useEffect(() => {
        dispatch(todoListsThunks.getTodoLists());
    }, []);
    const addTodoList = (title: string) => {
        dispatch(todoListsThunks.createTodoList({ title }));
    };
    return (
        <>
            <div className={s.addTodoItem}>
                <h2 className={s.title}>Menu</h2>
                <AddItemForm title={'Todo List'} callback={addTodoList} />
                <div className={s.todoList}>
                    {todoLists.map((todo) => (
                        <TodoList key={todo.id} {...todo} />
                    ))}
                </div>
            </div>
        </>
    );
};
