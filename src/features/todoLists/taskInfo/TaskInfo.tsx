import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import s from './TaskInfo.module.scss';
import { tasksThunks, TaskType } from 'features/todoLists/tasks/taskSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch } from 'common/hooks/hooks';

export const TaskInfo: FC<{ task: TaskType }> = ({ task }) => {
    const dispatch = useAppDispatch();
    const [taskState, setTaskState] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        deadline: task.deadline,
    });
    useEffect(() => {
        setTaskState(task);
    }, [task]);

    const onDeadLineChange = (deadline: Date) => {
        const newTaskState = { ...taskState, deadline: deadline };
        setTaskState(newTaskState);
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskState({ ...taskState, title: e.currentTarget.value });
    };

    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTaskState({ ...taskState, description: e.currentTarget.value });
    };

    const updateTaskProperties = () => {
        dispatch(tasksThunks.updateTask({ todoListID: task.todoListId, taskID: task.id, updateModel: taskState }));
    };

    return (
        <div className={s.taskInfo}>
            <h2 className={s.taskInfoTitle}>{`Task info for ${task.title}`}</h2>
            <div className={s.taskInfoBody}>
                <div className={s.input}>
                    <h3>Change task title</h3>
                    <input className={s.title} type="text" value={taskState.title} onChange={onTitleChange} />
                </div>

                <div className={s.text}>
                    <h3>Change task description</h3>
                    <textarea value={taskState.description} onChange={onChangeDescription} />
                </div>
                <div className={s.date}>
                    <h3>Change task deadline</h3>
                    <DatePicker
                        className={s.dateConfiguration}
                        selected={taskState.deadline ? new Date(taskState.deadline) : new Date()}
                        onChange={onDeadLineChange}
                        dateFormat="dd-MM-yyyy"
                    />
                </div>
            </div>

            <button onClick={updateTaskProperties}>Save</button>
        </div>
    );
};
