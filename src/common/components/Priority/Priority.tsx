import React, { FC } from 'react';
import s from 'features/todolists/tasks-list/ui/task/Task.module.scss';
import { BsFlagFill } from 'react-icons/bs';
import { TaskPriorities } from 'common/enums';

type PriorityLevelType = {
    priority: TaskPriorities;
};

export const Priority: FC<PriorityLevelType> = ({ priority }) => {
    const color = {
        0: '#00ffd0',
        1: '#09fa4d',
        2: '#ff8000',
        3: '#ff2600',
        4: '#d642ed',
    };
    return (
        <>
            <div className={s.priority}>{<BsFlagFill style={{ color: color[priority] }} />}</div>
        </>
    );
};
