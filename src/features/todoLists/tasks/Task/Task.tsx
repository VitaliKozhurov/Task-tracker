import React, { ChangeEvent, FC } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import s from './Task.module.scss';
import { Priority } from 'components/Priority/Priority';
import { AddedDate } from 'components/AddedDate/AddedDate';
import { Deadline } from 'components/Deadline/Deadline';
import { RemoveIcon } from 'components/RemoveIcon/RemoveIcon';
import { useAppDispatch } from 'common/hooks/hooks';
import { tasksActions, tasksThunks, TaskType } from 'features/todoLists/tasks/taskSlice';
import { TaskStatuses } from 'common/enums';
import { EntityStatus } from 'app/appSlice';

export const Task: FC<TaskType> = ({
    id,
    title,
    deadline,
    priority,
    addedDate,
    todoListId,
    isActive,
    status,
    entityStatus,
}) => {
    const dispatch = useAppDispatch();
    const setActiveTaskStatus = () => {
        dispatch(tasksActions.changeTaskActiveStatus({ todoListID: todoListId, taskID: id }));
    };
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(tasksThunks.updateTask({ todoListID: todoListId, taskID: id, updateModel: { status: newStatus } }));
    };
    const removeTask = () => {
        dispatch(tasksThunks.deleteTask({ todoListID: todoListId, taskID: id }));
    };
    const taskClassName =
        s.taskBody +
        (isActive ? ' ' + s.isActive : '') +
        (entityStatus === EntityStatus.LOADING ? ' ' + s.disabled : '');
    return (
        <div className={taskClassName}>
            <input
                className={s.checkBox}
                checked={status === TaskStatuses.Completed}
                type="checkbox"
                onChange={onChangeTaskStatus}
            />
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
