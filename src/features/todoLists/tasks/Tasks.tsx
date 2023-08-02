import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todoLists/tasks/tasks.selectors';
import { Task } from 'features/todoLists/tasks/Task/Task';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { tasksThunks } from 'features/todoLists/tasks/taskSlice';
import { getActiveTodoList } from 'features/todoLists/todoLists.selectors';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    const activeTodoListID = useAppSelector(getActiveTodoList);
    const dispatch = useAppDispatch();

    const addTask = (title: string) => {
        dispatch(tasksThunks.createTask({ title: { title }, todoListID: activeTodoListID ? activeTodoListID.id : '' }));
    };
    return (
        <>
            {activeTodoListID && <AddItemForm title={'Tasks'} callback={addTask} />}
            {tasks.map((task) => (
                <Task {...task} />
            ))}
        </>
    );
};
