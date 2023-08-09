import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todolists/tasks-list/model/tasks-selectors';
import { Task } from 'features/todolists/tasks-list/ui/task/Task';
import { tasksThunks } from 'features/todolists/tasks-list/model/task-slice';
import { getActiveTodoList } from 'features/todolists/todolists-list/model/todo-lists-selectors';
import s from 'features/todolists/tasks-list/ui/Tasks.module.scss';
import { AddItemForm } from 'common/components';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    const activeTodoList = useAppSelector(getActiveTodoList);
    const dispatch = useAppDispatch();
    const addTask = (title: string) => {
        dispatch(tasksThunks.createTask({ title: { title }, todoListID: activeTodoList ? activeTodoList.id : '' }));
    };

    if (!activeTodoList) {
        return null;
    }

    return (
        <div className={s.todoItem}>
            <h2 className={s.todoTitle}>{`Tasks for ${activeTodoList.title}`}</h2>
            <div className={s.taskCreator}>
                {<AddItemForm title={'Tasks'} callback={addTask} />}
                {tasks.map((task) => (
                    <Task key={task.id} {...task} />
                ))}
            </div>
        </div>
    );
};
