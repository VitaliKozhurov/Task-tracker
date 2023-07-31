import React from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todoLists/tasks/tasks.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { Task } from 'features/todoLists/tasks/Task/Task';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    return (
        <>
            <AddItemForm />
            {tasks.map((task) => (
                <Task {...task} />
            ))}
        </>
    );
};
