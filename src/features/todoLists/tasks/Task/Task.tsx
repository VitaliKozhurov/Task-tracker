import React, { FC } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import s from './Task.module.scss';
import { Priority } from 'components/Priority/Priority';
import { AddedDate } from 'components/AddedDate/AddedDate';
import { Deadline } from 'components/Deadline/Deadline';
import { RemoveIcon } from 'components/RemoveIcon/RemoveIcon';
import { useAppDispatch } from 'common/hooks/hooks';
import { tasksActions, tasksThunks, TaskType } from 'features/todoLists/tasks/taskSlice';

export const Task: FC<TaskType> = ({ id, title, deadline, priority, addedDate, todoListId, isActive }) => {
    const dispatch = useAppDispatch();
    const setActiveTaskStatus = () => {
        dispatch(tasksActions.changeTaskActiveStatus({ todoListID: todoListId, taskID: id }));
    };
    const removeTask = () => {
        dispatch(tasksThunks.deleteTask({ todoListID: todoListId, taskID: id }));
    };
    return (
        <div className={s.taskBody + (isActive ? ' ' + s.isActive : '')}>
            <input type="checkbox" />
            <div className={s.taskInfo}>
                <h2 className={s.title}>{title}</h2>
                <div className={s.taskProperties}>
                    <Priority priority={priority} />
                    <AddedDate addedDate={addedDate} />
                    <Deadline deadline={deadline} />
                </div>
            </div>
            <div className={s.icons} onClick={setActiveTaskStatus}>
                <MdOutlineArrowForwardIos className={s.icon} />
            </div>
            <RemoveIcon callback={removeTask} />
        </div>
    );
};
