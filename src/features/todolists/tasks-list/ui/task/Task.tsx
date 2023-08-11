import React, { ChangeEvent, FC } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import style from 'features/todolists/tasks-list/ui/task/Task.module.scss';
import { useAppDispatch } from 'common/hooks/hooks';
import { tasksActions, tasksThunks, TaskType } from 'features/todolists/tasks-list/model/task-slice';
import { TaskStatuses } from 'common/enums';
import { EntityStatus } from 'app/model/app-slice';
import { AddedDate, Deadline, Priority, RemoveIcon } from 'common/components';
import { BsCheckCircle } from 'react-icons/bs';

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
        style.taskBody +
        (isActive ? ' ' + style.isActive : '') +
        (entityStatus === EntityStatus.LOADING ? ' ' + style.disabled : '');
    return (
        <div className={taskClassName}>
            <input
                className={style.checkBox}
                checked={status === TaskStatuses.Completed}
                type="checkbox"
                onChange={onChangeTaskStatus}
            />
            <div className={style.taskInfo}>
                <h2 className={style.title}>{title}</h2>
                <div className={style.taskProperties}>
                    <Priority priority={priority} />
                    <AddedDate addedDate={addedDate} />
                    <Deadline deadline={deadline} />
                </div>
            </div>
            <div className={style.icons} onClick={setActiveTaskStatus}>
                <MdOutlineArrowForwardIos className={style.icon} />
            </div>
            <RemoveIcon callback={removeTask} />
            {status === TaskStatuses.Completed && <BsCheckCircle className={style.completed} />}
        </div>
    );
};
