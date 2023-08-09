import React from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import s from 'features/todolists/TodoLists.module.scss';
import { TodoListsList } from 'features/todolists/todolists-list/ui/TodoLists';
import { Tasks } from 'features/todolists/tasks-list/ui/Tasks';
import { TaskInfo } from 'features/todolists/task-info/ui/TaskInfo';
import { getActiveTask } from 'features/todolists/tasks-list/model/tasks-selectors';

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
