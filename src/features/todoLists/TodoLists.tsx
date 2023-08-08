import React from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import s from './TodoLists.module.scss';
import { TodoListsList } from 'features/todoLists/TodoListsList/TodoListstList';
import { Tasks } from 'features/todoLists/tasks/Tasks';
import { TaskInfo } from 'features/todoLists/taskInfo/TaskInfo';
import { getActiveTask } from 'features/todoLists/tasks/tasks.selectors';

export const TodoLists = () => {
    const activeTask = useAppSelector(getActiveTask);

    return (
        <>
            <div className={s.todoListsBody}>
                <TodoListsList />
                <Tasks />
                {activeTask && <TaskInfo task={activeTask} />}
            </div>
        </>
    );
};
