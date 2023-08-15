import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { tasksThunks, TaskType } from 'features/todolists/tasks-list/model/task-slice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch } from 'common/hooks/hooks';
import { PrioritySelector } from 'common/components/PrioritySelector/PrioritySelector';
import { TaskPriorities } from 'common/enums';
import { appActions, EntityStatus } from 'app/model/app-slice';
import { motion } from 'framer-motion';
import style from './TaskInfo.module.scss';
import { blockAnimation } from 'common/animation/animations';

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
        const newTaskState = { ...taskState, deadline: deadline.toISOString() };
        setTaskState(newTaskState);
    };

    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskState({ ...taskState, title: e.currentTarget.value });
    };

    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTaskState({ ...taskState, description: e.currentTarget.value });
    };

    const onChangePriority = (newPriority: TaskPriorities) => {
        setTaskState({ ...taskState, priority: newPriority });
    };

    const updateTaskProperties = () => {
        if (!taskState.title) {
            dispatch(appActions.setAppError({ error: 'task title is required!' }));
            return;
        }
        dispatch(tasksThunks.updateTask({ todoListID: task.todoListId, taskID: task.id, updateModel: taskState }));
    };

    return (
        <motion.div initial={'hidden'} whileInView={'visible'} className={style.motionTaskInfo}>
            <motion.div className={style.taskInfo} variants={blockAnimation}>
                <h2 className={style.taskInfoTitle}>{`Task info for ${task.title}`}</h2>
                <div className={style.taskInfoBody}>
                    <div className={style.input}>
                        <h3>Change task title</h3>
                        <input className={style.title} type="text" value={taskState.title} onChange={onTitleChange} />
                    </div>

                    <div className={style.text}>
                        <h3>Change task description</h3>
                        <textarea
                            value={taskState.description === null ? '' : taskState.description}
                            onChange={onChangeDescription}
                        />
                    </div>

                    <div className={style.date}>
                        <h3>Change task deadline</h3>
                        <DatePicker
                            className={style.dateConfiguration}
                            selected={taskState.deadline ? new Date(taskState.deadline) : new Date()}
                            onChange={onDeadLineChange}
                            dateFormat="dd-MM-yyyy"
                        />
                    </div>

                    <div>
                        <h3>Change task priority</h3>
                        <PrioritySelector currentPriority={taskState.priority} callback={onChangePriority} />
                    </div>
                </div>
                <button
                    className={style.btn}
                    onClick={updateTaskProperties}
                    disabled={task.entityStatus === EntityStatus.LOADING}
                >
                    Save task info
                </button>
            </motion.div>
        </motion.div>
    );
};
