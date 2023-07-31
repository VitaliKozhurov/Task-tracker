import React from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todoLists/tasks/tasks.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    return (
        <>
            <AddItemForm />
            {tasks.map((todo) => (
                <li>{todo.title}</li>
            ))}
        </>
    );
};
