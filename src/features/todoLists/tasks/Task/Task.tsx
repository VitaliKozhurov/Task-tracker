import React, { FC } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import s from './Task.module.scss';
import { TaskServerType } from 'features/todoLists/tasks/tasksApi';
import { Priority } from 'components/Priority/Priority';
import { AddedDate } from 'components/AddedDate/AddedDate';
import { Deadline } from 'components/Deadline/Deadline';

export const Task: FC<TaskServerType> = ({ title, deadline, priority, addedDate, todoListId }) => {
    return (
        <>
            <div className={s.taskBody}>
                <input type="checkbox" />
                <div className={s.taskInfo}>
                    <h2 className={s.title}>{title}</h2>
                    <div className={s.taskProperties}>
                        <Priority priority={priority} />
                        <AddedDate addedDate={addedDate} />
                        <Deadline deadline={deadline} />
                    </div>
                </div>
                <div className={s.icons}>
                    <MdOutlineArrowForwardIos className={s.icon} />
                </div>
            </div>
        </>
    );
};
