import React from 'react';
import { useAppSelector } from 'common/hooks/hooks';
import s from './TodoLists.module.scss';
import { getAuthLoggedStatusSelector } from 'features/login/auth.selectors';
import { Navigate } from 'react-router-dom';
import { TodoListsList } from 'features/todoLists/TodoListsList/TodoListstList';
import { Tasks } from 'features/todoLists/tasks/Tasks';
import { TaskInfo } from 'features/todoLists/taskInfo/TaskInfo';
import { getActiveTask } from 'features/todoLists/tasks/tasks.selectors';

export const TodoLists = () => {
    const isLoggedIn = useAppSelector(getAuthLoggedStatusSelector);
    const activeTask = useAppSelector(getActiveTask);

    if (!isLoggedIn) {
        return <Navigate to={'/login'} />;
    }

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
