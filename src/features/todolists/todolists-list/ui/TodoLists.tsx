import React, { useEffect, useState } from 'react';
import s from 'features/todolists/todolists-list/ui/TodoLists.module.scss';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTodoListsSelector } from 'features/todolists/todolists-list/model/todo-lists-selectors';
import { todoListsThunks, TodoListType } from 'features/todolists/todolists-list/model/todo-lists-slice';
import { TodoList } from './todoList/TodoList';

export const TodoListsList = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(getTodoListsSelector);
    const [draggableTodo, setDraggableTodo] = useState<null | TodoListType>(null);

    useEffect(() => {
        dispatch(todoListsThunks.getTodoLists());
    }, []);

    const addTodoList = (title: string) => {
        dispatch(todoListsThunks.createTodoList({ title }));
    };
    const setDraggableTodoList = (todo: TodoListType) => {
        setDraggableTodo(todo);
    };

    let sortedTodoLists = todoLists.length ? [...todoLists].sort((a, b) => (a.order > b.order ? 1 : -1)) : todoLists;

    return (
        <>
            <div className={s.addTodoItem}>
                <h2 className={s.title}>Menu</h2>
                <AddItemForm title={'Todo List'} callback={addTodoList} />
                <div className={s.todoList}>
                    {sortedTodoLists.map((todo) => (
                        <TodoList
                            key={todo.id}
                            todo={todo}
                            draggableTodo={draggableTodo}
                            setDraggableTodoList={setDraggableTodoList}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
