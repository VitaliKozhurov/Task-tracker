import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todoLists/tasks/tasks.selectors';
import { Task } from 'features/todoLists/tasks/Task/Task';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import { tasksThunks } from 'features/todoLists/tasks/taskSlice';
import { getActiveTodoList } from 'features/todoLists/todoLists.selectors';
import s from './Tasks.module.scss';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    const activeTodoList = useAppSelector(getActiveTodoList);
    const dispatch = useAppDispatch();
    const addTask = (title: string) => {
        dispatch(tasksThunks.createTask({ title: { title }, todoListID: activeTodoList ? activeTodoList.id : '' }));
    };

    return (
        <div className={s.todoItem}>
            {activeTodoList && (
                <>
                    <h2 className={s.todoTitle}>{`Tasks for ${activeTodoList.title}`}</h2>
                    <div className={s.taskCreator}>
                        {<AddItemForm title={'Tasks'} callback={addTask} />}
                        {tasks.map((task) => (
                            <Task {...task} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
