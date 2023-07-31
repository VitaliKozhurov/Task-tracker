import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todoLists/tasks/tasks.selectors';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { Task } from 'features/todoLists/tasks/Task/Task';
import { tasksThunks } from 'features/todoLists/tasks/taskSlice';

export const Tasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasksForActiveTodoList);
    const addTask = (title: string) => {
        dispatch(tasksThunks.createTask({ title: { title }, todoListID: tasks[0].todoListId }));
    };
    return (
        <>
            <AddItemForm title={'Tasks'} callback={addTask} />
            {tasks.map((task) => (
                <Task {...task} />
            ))}
        </>
    );
};
