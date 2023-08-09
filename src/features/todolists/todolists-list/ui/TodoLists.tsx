import React, { useEffect, useState } from 'react';
import s from 'features/todolists/todolists-list/ui/TodoLists.module.scss';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { TodoList } from 'features/todolists/todolists-list/ui/todoList/TodoList';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTodoListsSelector } from 'features/todolists/todolists-list/model/todo-lists-selectors';
import { todoListsThunks, TodoListType } from 'features/todolists/todolists-list/model/todo-lists-slice';

export const TodoListsList = () => {
    const dispatch = useAppDispatch();
    const todoLists = useAppSelector(getTodoListsSelector);
    const [currentTodo, setCurrentTodo] = useState<null | TodoListType>(null);

    useEffect(() => {
        dispatch(todoListsThunks.getTodoLists());
    }, []);

    const addTodoList = (title: string) => {
        dispatch(todoListsThunks.createTodoList({ title }));
    };
    const setDraggableTodoList = (todo: TodoListType) => {
        setCurrentTodo(todo);
    };

    let sortedTodoLists: TodoListType[];
    if (todoLists.length) {
        sortedTodoLists = [...todoLists].sort((a, b) => (a.order > b.order ? 1 : -1));
    } else {
        sortedTodoLists = todoLists;
    }
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
                            currentTodo={currentTodo}
                            setDraggableTodoList={setDraggableTodoList}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
