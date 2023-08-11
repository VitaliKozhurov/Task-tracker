import React from 'react';
import { useAppDispatch, useAppSelector } from 'common/hooks/hooks';
import { getTasksForActiveTodoList } from 'features/todolists/tasks-list/model/tasks-selectors';
import { Task } from 'features/todolists/tasks-list/ui/task/Task';
import { tasksThunks } from 'features/todolists/tasks-list/model/task-slice';
import { getActiveTodoList } from 'features/todolists/todolists-list/model/todo-lists-selectors';
import style from 'features/todolists/tasks-list/ui/Tasks.module.scss';
import { AddItemForm, Button } from 'common/components';
import { FilterGroup } from 'common/components/FilterGroup/FilterGroup';
import { TaskStatuses } from 'common/enums';

export const Tasks = () => {
    const tasks = useAppSelector(getTasksForActiveTodoList);
    const activeTodoList = useAppSelector(getActiveTodoList);
    const dispatch = useAppDispatch();
    const addTask = (title: string) => {
        return dispatch(
            tasksThunks.createTask({ title: { title }, todoListID: activeTodoList ? activeTodoList.id : '' }),
        ).unwrap();
    };

    const deleteCompletedTasks = () => {
        const completedTasks = tasks.filter((task) => task.status === TaskStatuses.Completed);
        completedTasks.forEach((task) =>
            dispatch(tasksThunks.deleteTask({ todoListID: task.todoListId, taskID: task.id })),
        );
    };

    if (!activeTodoList) {
        return null;
    }

    let filteredTasks = tasks;
    switch (activeTodoList.filter) {
        case 'active':
            filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New);
            break;
        case 'completed':
            filteredTasks = tasks.filter((task) => task.status === TaskStatuses.Completed);
    }

    return (
        <div className={style.todoItem}>
            <h2 className={style.todoTitle}>{`Tasks for ${activeTodoList.title}`}</h2>
            <div className={style.taskCreator}>
                {<AddItemForm title={'Tasks'} callback={addTask} />}
                <div className={style.list}>
                    {filteredTasks.map((task) => (
                        <Task key={task.id} {...task} />
                    ))}
                </div>
            </div>
            {!!tasks.length && (
                <>
                    <div className={style.filterGroup}>
                        <FilterGroup todoListID={activeTodoList.id} filterType={activeTodoList.filter} />
                    </div>
                    <Button callback={deleteCompletedTasks} style={style.btn}>
                        Clear all completed tasks
                    </Button>
                </>
            )}
        </div>
    );
};
